import EventBus from '../lib/nx-event-bus'

const EventBusFactory = name => new EventBus(name)

describe('#EventBus', () => {
  it('should instantiate successful', () => {
    expect(EventBusFactory).not.toThrow()
  })

  it('should have a default name', () => {
    expect(EventBusFactory().name).toBe('EventBus')
  })

  it('should override default name when a string is given', () => {
    expect(EventBusFactory('name').name).toBe('name')
  })

  it('should destroy successfull', () => {
    expect(() => EventBusFactory().destroy()).not.toThrow()
  })

  it('should emit events to listeners', done => {
    const bus = EventBusFactory()
    bus.on('a', (event, data) => {
      expect(data).toBe('test-event')
      expect(event).toBeInstanceOf(EventBus.BusEvent)
      expect(event.data).toBe('test-event')
      expect(event.channel).toBe('a')
      done()
    })
    bus.emit('a', 'test-event')
  })

  it('should emit async events to listeners', done => {
    const bus = EventBusFactory()
    bus.on('a', (event, data) => {
      expect(data).toBe('test-event')
      expect(event).toBeInstanceOf(EventBus.BusEvent)
      expect(event.data).toBe('test-event')
      expect(event.channel).toBe('a')
      done()
    })
    bus.emitAsync('a', 'test-event')
  })

  it('should emit events to listeners that are registered once', done => {
    const bus = EventBusFactory()
    bus.registerOnce('a', (event, data) => {
      expect(data).toBe('test-event')
      expect(event).toBeInstanceOf(EventBus.BusEvent)
      expect(event.data).toBe('test-event')
      expect(event.channel).toBe('a')
      done()
    })
    bus.emit('a', 'test-event')
  })

  it('should not emit events to other chanel listeners', () => {
    const mockCallback = jest.fn();
    const mockCallback2 = jest.fn();
    const bus = EventBusFactory()
    bus.on('ab', mockCallback)
    bus.on('a', mockCallback2)
    bus.emit('a', 'test-event')
    expect(mockCallback.mock.calls.length).toBe(0);
    expect(mockCallback2.mock.calls.length).toBe(1);
  })

  it('should only call registerOnce once', () => {
    const mockCallback = jest.fn();
    const bus = EventBusFactory()
    bus.registerOnce('a', mockCallback)
    bus.emit('a', 'data')
    bus.emit('a', 'data')
    expect(mockCallback.mock.calls.length).toBe(1)
  })

  it('should deregister listener from returned callback', () => {
    const mockCallback = jest.fn();
    const bus = EventBusFactory()
    const deregister = bus.registerOnce('a', mockCallback)
    deregister();
    bus.emit('a', 'data')
    expect(mockCallback.mock.calls.length).toBe(0);
  })

  it('should deregister listener from calling deregister', () => {
    const mockCallback = jest.fn();
    const bus = EventBusFactory()
    bus.registerOnce('a', mockCallback)
    bus.deregister('a', mockCallback)
    bus.emit('a', 'data')
    expect(mockCallback.mock.calls.length).toBe(0);
  })

  it('should throw error when a non function is given to register', () => {
    expect(() => EventBusFactory().on('ab', '')).toThrow(/The given parameter at function register is invalid: The given listener undefined is not a function/)
  })

  it('should throw error when a non BusEvent is given to emitEvent', () => {
    expect(() => EventBusFactory().emitEvent('ab')).toThrow(/The given parameter at function emitEvent is invalid: The given eventBus ab is not a valid BusEvent/)
  })
})
