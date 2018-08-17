(function() {
  "use strict";

  const map = new WeakMap();
  const self = key => map.get(key) || map.set(key, {}).get(key);

  /**
   * Helper function to check if the given param is a function
   *
   * @param  {function()}     fn  The given object
   * @return {boolean}        True if the given param is a function
   */
  const isFunction = fn => fn && fn.constructor && fn.call && fn.apply;

  /**
   * Helper function used to compare two functions
   *
   * @param  {function()}   fn      The given function
   * @return {string}               Returns the function as a string
   */
  const toString = fn => fn && fn.toString ? fn.toString() : undefined;

  class BusEvent {
    /**
     * The bus event constructor
     *
     * @param {Object} options
     * @param {*}      options.data       The event data object
     * @param {string} options.channel    The event channel
     */
    constructor(options) {
      self(this)._enable = true;
      // Store the event date
      self(this)._data = options.data;
      // Store the event channel
      self(this)._channel = options.channel;
      // Store the event creation date
      self(this)._timeStamp = Date.now();
    }

    /**
     * @return {*} Returns the event data
     */
    get data() {
      return self(this)._data;
    }

    /**
     * @return {string} Returns the event channel
     */
    get channel() {
      return self(this)._channel;
    }

    /**
     * @return {number} Returns the event time stamp
     */
    get timeStamp() {
      return self(this)._timeStamp;
    }

    /**
     * Stop the event propagation
     */
    stopPropagation() {
      self(this)._enable = false;
    }

    /**
     * @return {boolean} returns true if the event is enabled
     */
    isEnable() {
      return self(this)._enable;
    }
  }

  /**
   * Invalid Parameter Given exception
   *
   * @param {string} fnName  The function name
   * @param {*}      message The message
   */
  class InvalidParameterGiven extends Error {
    constructor(fnName, message) {
      super(message);
      this.name = this.constructor.name;
      this.message =
        "The given parameter at function " + fnName + " is invalid: " + message;

      if (Error.captureStackTrace && isFunction(Error.captureStackTrace)) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error(message).stack;
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
     * @param {object}      options             Options object with params described below
     * @param {string}      options.channel     The channel on witch the events will be broadcast
     * @param {function()}  options.scope       The listener scope
     * @param {function()}  options.fn          The listener callback function
     */
    constructor(options) {
      self(this).channel = options.channel;
      self(this).fn = options.fn;
      // If no scope was given apply the function scope
      self(this).scope = options.scope || options.fn;
    }

    /**
     * @return {string} Return the listener channel
     */
    get channel() {
      return self(this).channel;
    }

    /**
     * @return {function()} Return the callback function
     */
    get fn() {
      return self(this).fn;
    }

    /**
     * @return {function()} Return the callback function scope
     */
    get scope() {
      return self(this).scope;
    }
  }

  class EventBus {
    /**
     * Return all the errors type
     */
    static get Errors() {
      return {
        InvalidParameterGiven: InvalidParameterGiven
      };
    }

    /**
     * Return the BusEvent
     *
     * @note Used for checking the event type
     */
    static get BusEvent() {
      return BusEvent;
    }

    /**
     * The event bus constructor
     *
     * @param  {string} name [description]
     */
    constructor(name) {
      // If a name wasn't given set the name as class name
      self(this)._name = name || this.constructor.name;
      self(this)._listeners = {};
      self(this)._deadEvents = [];
      self(this)._deadEventsResending = false;
    }

    /**
     * @return {string} Return the event bus name
     */
    get name() {
      return self(this)._name;
    }

    /**
     * Method used to register a callback function on a specific channel
     *
     * @param  {string}       channel     The given channel
     * @param  {function()}   listener    The callback function
     * @param  {function()}   scope       The callback function scope
     * @return {function()}               Returns a deregister function
     *
     * @throws {InvalidParameterGiven} If [this condition is met]
     */
    register(channel, listener, scope) {
      // Don't register the listener if it hasn't a listener function
      // of the given function isn't a function.
      if (!isFunction(listener)) {
        throw new InvalidParameterGiven(
          "register",
          "The given listener " + toString(listener) + " is not a function."
        );
      }

      // If a listener array isn't create for the channel create a new one
      if (!self(this)._listeners[channel]) {
        self(this)._listeners[channel] = [];
      }

      // Push the listener in the listeners array
      self(this)._listeners[channel].push(
        new EventListener({
          channel: channel,
          fn: listener,
          scope: scope
        })
      );

      return () => {
        this.deregister(channel, listener);
      };
    }

    /**
     * Method used to register a callback function on a specific channel
     *
     * @param  {string}       channel     The given channel
     * @param  {function()}   listener    The callback function
     * @param  {function()}   scope       The callback function scope
     * @return {function()}               Returns a deregister function
     *
     * @throws {InvalidParameterGiven} If [this condition is met]
     */
    registerOnce(channel, listener, scope) {
      // Don't register the listener if it hasn't a listener function
      // of the given function isn't a function.
      if (!isFunction(listener)) {
        throw new InvalidParameterGiven(
          "registerOnce",
          "The given listener " + toString(listener) + " is not a function."
        );
      }

      // Store the deregister function to deregister the event after first call
      let deregisterFunction = this.register(channel, () => {
        // Deregister the function
        deregisterFunction();

        // Call the callback function with the current function arguments
        listener.apply(scope || listener, arguments);
      });

      // If the event re-sender isn't running then start it.
      if (!self(this)._deadEventsResending) {
        setTimeout(() => {
          if (!this.destroyed) {
            this.resendDeadEvents.apply(this);
          }
        });
      }

      return deregisterFunction;
    }

    /**
     * Deregister a function from the event bus
     *
     * @param  {string}     channel  The listening channel
     * @param  {function()} listener The listener function
     */
    deregister(channel, listener) {
      // Don't deregister the listener if it hasn't a listener function
      // of the given function isn't a function.
      if (!isFunction(listener)) {
        throw new InvalidParameterGiven(
          "deregister",
          "The given listener " + toString(listener) + " is not a function."
        );
      }

      // Get all the channel listeners
      let listeners = self(this)._listeners[channel];

      for (let i = listeners.length - 1; i >= 0; i--) {
        if (
          toString(listeners[i].fn) === toString(listener) &&
          listeners[i].channel === channel
        ) {
          listeners.splice(i, 1);
        }
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
      if (!channel) {
        throw new InvalidParameterGiven(
          "emit",
          "The given channel " + channel + " is not a correct parameter."
        );
      }

      // Create the bus event with the given data
      this.emitEvent(
        new BusEvent({
          channel: channel,
          data: data
        })
      );

      return this;
    }

    /**
     * Emit a bus event
     *
     * @param  {BusEvent} busEvent [description]
     */
    emitEvent(busEvent) {
      // Check if the given parameter is a type of BusEvent
      if (!(busEvent instanceof BusEvent)) {
        throw new InvalidParameterGiven(
          "emitEvent",
          "The given eventBus " + busEvent + " is not a valid BusEvent."
        );
      }

      let event = busEvent;
      let wasCaptured = false;
      let listeners = self(this)._listeners[event.channel];
      let args = [event].concat(
        Array.isArray(event.data) ? event.data : [event.data]
      );

      if (listeners) {
        for (let i = listeners.length - 1; i >= 0; i--) {
          let currentListener = listeners[i];

          // If the event wasn't prevented continue
          if (event.isEnable()) {
            currentListener.fn.apply(currentListener.scope, args);
            wasCaptured = true;
          } else {
            break;
          }
        }
      }

      // If the event didn't trigger any listeners mark it as a dead event
      // @Note will be rebroadcast-ed when possible
      if (!wasCaptured) {
        self(this)._deadEvents.push(event);
      }

      if (!self(this)._deadEventsResending) {
        setTimeout(() => {
          if (!this.destroyed) {
            this.resendDeadEvents.apply(this);
          }
        });
      }

      return this;
    }

    /**
     * Method to emit an event async
     *
     * @param  {string}     channel     The event channel
     * @param  {*}          data        The event data
     * @param  {integer}    delay       The delay until the event will be send
     * @return {EventBus}               Returns the current instance of the EventBus
     */
    emitAsync(channel, data, delay) {
      setTimeout(() => {
        if (!this.destroyed) {
          this.emit.call(this, channel, data);
        }
      }, delay || 0);

      return this;
    }

    /**
     * Start resending the 'dead' events if any
     */
    resendDeadEvents() {
      // Prevent any other calls to this function
      if (!self(this)._deadEventsResending) {
        self(this)._deadEventsResending = true;

        for (var i = self(this)._deadEvents.length - 1; i >= 0; i--) {
          var currentEvent = self(this)._deadEvents[i];
          this.emitEvent(currentEvent);
          self(this)._deadEvents.splice(i, 1);
        }

        // Release the lock
        self(this)._deadEventsResending = false;
      }
    }

    /**
     * Method used to register a callback function on a specific channel
     *
     * @alias EventBus.register
     * @see EventBus.register
     */
    on(channel, listener, scope) {
      return this.register.call(this, channel, listener, scope);
    }

    /**
     * Deregister a function from the event bus
     *
     * @alias EventBus.deregister
     * @see EventBus.deregister
     */
    off(channel, listener) {
      return this.deregister.call(this, channel, listener);
    }

    /**
     * Emit an event to a channel
     *
     * @alias EventBus.emit
     * @see EventBus.emit
     */
    broadcast(channel, data) {
      return this.emit.call(this, channel, data);
    }

    /**
     * Destroy the event bus
     */
    destroy() {
      this.destroyed = true;

      self(this)._listeners = null;
      self(this)._deadEvents = null;
      self(this)._deadEventsResending = null;
    }
  }

  if (typeof module === "object") {
    module.exports = EventBus;
  } else {
    window.EventBus = EventBus;
  }
})();
