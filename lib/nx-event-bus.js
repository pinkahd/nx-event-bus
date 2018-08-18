'use strict';

const map = new WeakMap()
const self = key => map.get(key) || map.set(key, Object.create(null)) && map.get(key)

/**
 * Helper function to check if the given param is a function
 *
 * @param  {function()}     fn  The given object
 * @return {boolean}        True if the given param is a function
 */
const isFunction = fn => !!(fn && fn.constructor && fn.call && fn.apply)

/**
 * Helper function used to compare two functions
 *
 * @param  {function()}   fn      The given function
 * @return {string}               Returns the function as a string
 */
const toString = fn => fn && fn.toString ? fn.toString() : undefined

class BusEvent {
  /**
   * The bus event constructor
   *
   * @param {Object} options
   * @param {*}      options.data       The event data object
   * @param {string} options.channel    The event channel
   */
  constructor(options) {
    self(this).data = options.data
    self(this).channel = options.channel
    self(this).timeStamp = Date.now()
  }

  /**
   * @return {*} Returns the event data
   */
  get data() { return self(this).data }

  /**
   * @return {string} Returns the event channel
   */
  get channel() { return self(this).channel }

  /**
   * @return {number} Returns the event time stamp
   */
  get timeStamp() { return self(this).timeStamp }

  /**
   * Stop the event propagation
   */
  stopPropagation() { self(this).disabled = true }

  /**
   * @return {boolean} returns true if the event is enabled
   */
  isEnable() { return !self(this).disabled }
}

/**
 * Invalid Parameter Given exception
 *
 * @param {string} fnName  The function name
 * @param {*}      message The message
 */
class InvalidParameterGiven extends Error {
  constructor(fnName, message) {
    super()
    this.name = 'InvalidParameterGiven'
    this.message = `The given parameter at function ${fnName} is invalid: ${message}`

    if (
      InvalidParameterGiven.captureStackTrace &&
      isFunction(InvalidParameterGiven.captureStackTrace)
    ) {
      InvalidParameterGiven.captureStackTrace(this, InvalidParameterGiven)
    } else {
      this.stack = new Error(message).stack
    }
  }
}

/**
 * Create an event listener object used to keep
 * track of the listeners informations in one place
 */
class EventListener {

  /**
   * Event Listener constructor
   *
   * @param {string}      channel     The channel on witch the events will be broadcast
   * @param {function()}  fn          The listener callback function
   * @param {function()}  scope       The listener scope
   * @param {boolean}     once        If it's a one time listener
   */
  constructor(channel, fn, scope, once) {
    self(this).channel = channel
    self(this).fn = fn
    self(this).scope = scope || fn
    self(this).once = once
  }

  /**
   * @return {string} Return the listener channel
   */
  get channel() { return self(this).channel }

  /**
   * @return {function()} Return the callback function
   */
  get fn() { return self(this).fn }

  /**
   * @return {function()} Return the callback function scope
   */
  get scope() { return self(this).scope }

  /**
   * @returns {boolean} Returns true if it's a one time listener
   */
  get once() { return self(this).once }

  /**
   * Emit the event to the listener function
   *
   * @param {BusEvent} event
   */
  emit(event) {
    const args = [event].concat(event.data)
    this.fn.call(this.scope, ...args)
  }

  /**
   * Check if the given callback is the same as the listener ones
   *
   * @param  {function()} listener
   * @returns {boolean}
   */
  is(listener) { return toString(this.fn) === toString(listener) }
}

class EventBus {
  /**
   * Return all the errors type
   */
  static get Errors() {
    return {
      InvalidParameterGiven: InvalidParameterGiven
    }
  }

  /**
   * Return the BusEvent class
   */
  static get BusEvent() { return BusEvent }

  /**
   * The event bus constructor
   *
   * @param  {string} name [description]
   */
  constructor(name) {
    self(this).name = name || this.constructor.name;
    self(this).listeners = Object.create(null)
    self(this).deadEvents = []
    self(this).resendingDeadEvents = false
  }

  /**
   * @return {string} Return the event bus name
   */
  get name() { return self(this).name }

  /**
   * Method used to register a callback function on a specific channel
   *
   * @param  {string}       channel      The given channel
   * @param  {function()}   listener     The callback function
   * @param  {function()}   [scope=]     The callback function scope
   * @param  {boolean}      [once=false] If it should deregister after first event
   * @return {function()}                Returns a deregister function
   *
   * @throws {InvalidParameterGiven} If [this condition is met]
   */
  register(channel, listener, scope, once) {
    if (!isFunction(listener)) {
      throw new InvalidParameterGiven(
        'register',
        `The given listener ${toString(listener)} is not a function.`
      )
    }

    self(this).listeners[channel] = self(this).listeners[channel] || []
    self(this).listeners[channel].push(
      new EventListener(channel, listener, scope, once)
    )

    setTimeout(() => this.resendDeadEvents())
    return () => this.deregister(channel, listener)
  }

  /**
   * Method used to register a callback function on a specific channel
   *
   * @param  {string}       channel     The given channel
   * @param  {function()}   listener    The callback function
   * @param  {function()}   [scope=]    The callback function scope
   * @return {function()}               Returns a deregister function
   *
   * @throws {InvalidParameterGiven} If [this condition is met]
   */
  registerOnce(channel, listener, scope) {
    return this.register(channel, listener, scope, true)
  }

  /**
   * Deregister a function from the event bus
   *
   * @param  {string}     channel  The listening channel
   * @param  {function()} listener The listener function
   */
  deregister(channel, listener) {
    if (!isFunction(listener)) {
      throw new InvalidParameterGiven(
        'deregister',
        'The given listener ' + toString(listener) + ' is not a function.'
      )
    }

    const listeners = self(this).listeners[channel];
    for (let i = listeners.length - 1; i >= 0; i--) {
      if (listeners[i].is(listener)) { listeners.splice(i, 1) }
    }
  }

  /**
   * Emit an event to a channel
   *
   * @param  {string} channel The event channel
   * @param  {*}      data    The event data
   * @return {EventBus}       Returns the current instance of the EventBus
   */
  emit(channel, data) {
    if (channel == null) {
      throw new InvalidParameterGiven(
        'emit',
        `The given channel ${channel} is not a correct parameter.`
      )
    }
    return this.emitEvent(new BusEvent({ channel: channel, data: data }))
  }

  /**
   * Emit a bus event
   *
   * @param  {BusEvent} event [description]
   */
  emitEvent(event) {
    if (!(event instanceof BusEvent)) {
      throw new InvalidParameterGiven(
        'emitEvent',
        `The given eventBus ${event} is not a valid BusEvent.`
      )
    }

    if (this.destroyed) { return this }

    const listeners = self(this).listeners[event.channel] || []
    let deadEvent = true

    for (let i = listeners.length - 1; i >= 0; i--) {
      if (event.isEnable()) {
        const listener = listeners[i]
        listener.emit(event)
        deadEvent = false
        if (listener.once) { this.deregister(listener.channel, listener.fn) }
      } else {
        break
      }
    }

    if (deadEvent) { self(this).deadEvents.push(event) }
    setTimeout(() => this.resendDeadEvents())
    return this
  }

  /**
   * Method to emit an event async
   *
   * @param  {string}     channel     The event channel
   * @param  {*}          data        The event data
   * @param  {number}     [delay=]    The delay until the event will be send
   * @return {EventBus}               Returns the current instance of the EventBus
   */
  emitAsync(channel, data, delay) {
    setTimeout(() => this.emit(channel, data), delay)
    return this
  }

  /**
   * Start resending 'dead' events
   */
  resendDeadEvents() {
    if (!(self(this).resendingDeadEvents || this.destroyed)) {
      self(this).resendingDeadEvents = true
      for (let i = self(this).deadEvents.length - 1; i >= 0; i--) {
        this.emitEvent(self(this).deadEvents[i])
        self(this).deadEvents.splice(i, 1)
      }
      self(this).resendingDeadEvents = false
    }
  }

  /**
   * Method used to register a callback function on a specific channel
   *
   * @alias EventBus.register
   * @see EventBus.register
   */
  on(...args) { return this.register(...args) }

  /**
   * Deregister a function from the event bus
   *
   * @alias EventBus.deregister
   * @see EventBus.deregister
   */
  off(...args) { return this.deregister(...args) }

  /**
   * Emit an event to a channel
   *
   * @alias EventBus.emit
   * @see EventBus.emit
   */
  broadcast(...args) { return this.emit(...args) }

  /**
   * Destroy the event bus
   */
  destroy() {
    this.destroyed = true
    self(this).listeners = null
    self(this).deadEvents = null
    self(this).resendingDeadEvents = null
  }
}

if (typeof module === 'object') {
  module.exports = EventBus;
} else {
  window.EventBus = EventBus;
}

