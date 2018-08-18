## Classes

<dl>
<dt><a href="#BusEvent">BusEvent</a></dt>
<dd></dd>
<dt><a href="#InvalidParameterGiven">InvalidParameterGiven</a></dt>
<dd><p>Invalid Parameter Given exception</p>
</dd>
<dt><a href="#EventListener">EventListener</a></dt>
<dd><p>Create an event listener object used to keep
track of the listeners informations in one place</p>
</dd>
<dt><a href="#EventBus">EventBus</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#isFunction">isFunction(fn)</a> ⇒ <code>boolean</code></dt>
<dd><p>Helper function to check if the given param is a function</p>
</dd>
<dt><a href="#toString">toString(fn)</a> ⇒ <code>string</code></dt>
<dd><p>Helper function used to compare two functions</p>
</dd>
</dl>

<a name="BusEvent"></a>

## BusEvent
**Kind**: global class  

* [BusEvent](#BusEvent)
    * [new BusEvent(options)](#new_BusEvent_new)
    * [.data](#BusEvent+data) ⇒ <code>\*</code>
    * [.channel](#BusEvent+channel) ⇒ <code>string</code>
    * [.timeStamp](#BusEvent+timeStamp) ⇒ <code>number</code>
    * [.stopPropagation()](#BusEvent+stopPropagation)
    * [.isEnable()](#BusEvent+isEnable) ⇒ <code>boolean</code>

<a name="new_BusEvent_new"></a>

### new BusEvent(options)
The bus event constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.data | <code>\*</code> | The event data object |
| options.channel | <code>string</code> | The event channel |

<a name="BusEvent+data"></a>

### busEvent.data ⇒ <code>\*</code>
**Kind**: instance property of [<code>BusEvent</code>](#BusEvent)  
**Returns**: <code>\*</code> - Returns the event data  
<a name="BusEvent+channel"></a>

### busEvent.channel ⇒ <code>string</code>
**Kind**: instance property of [<code>BusEvent</code>](#BusEvent)  
**Returns**: <code>string</code> - Returns the event channel  
<a name="BusEvent+timeStamp"></a>

### busEvent.timeStamp ⇒ <code>number</code>
**Kind**: instance property of [<code>BusEvent</code>](#BusEvent)  
**Returns**: <code>number</code> - Returns the event time stamp  
<a name="BusEvent+stopPropagation"></a>

### busEvent.stopPropagation()
Stop the event propagation

**Kind**: instance method of [<code>BusEvent</code>](#BusEvent)  
<a name="BusEvent+isEnable"></a>

### busEvent.isEnable() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>BusEvent</code>](#BusEvent)  
**Returns**: <code>boolean</code> - returns true if the event is enabled  
<a name="InvalidParameterGiven"></a>

## InvalidParameterGiven
Invalid Parameter Given exception

**Kind**: global class  
<a name="new_InvalidParameterGiven_new"></a>

### new InvalidParameterGiven(fnName, message)

| Param | Type | Description |
| --- | --- | --- |
| fnName | <code>string</code> | The function name |
| message | <code>\*</code> | The message |

<a name="EventListener"></a>

## EventListener
Create an event listener object used to keep
track of the listeners informations in one place

**Kind**: global class  

* [EventListener](#EventListener)
    * [new EventListener(channel, fn, scope, once)](#new_EventListener_new)
    * [.channel](#EventListener+channel) ⇒ <code>string</code>
    * [.fn](#EventListener+fn) ⇒ <code>function</code>
    * [.scope](#EventListener+scope) ⇒ <code>function</code>
    * [.once](#EventListener+once) ⇒ <code>boolean</code>
    * [.emit(event)](#EventListener+emit)
    * [.is(listener)](#EventListener+is) ⇒ <code>boolean</code>

<a name="new_EventListener_new"></a>

### new EventListener(channel, fn, scope, once)
Event Listener constructor


| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The channel on witch the events will be broadcast |
| fn | <code>function</code> | The listener callback function |
| scope | <code>function</code> | The listener scope |
| once | <code>boolean</code> | If it's a one time listener |

<a name="EventListener+channel"></a>

### eventListener.channel ⇒ <code>string</code>
**Kind**: instance property of [<code>EventListener</code>](#EventListener)  
**Returns**: <code>string</code> - Return the listener channel  
<a name="EventListener+fn"></a>

### eventListener.fn ⇒ <code>function</code>
**Kind**: instance property of [<code>EventListener</code>](#EventListener)  
**Returns**: <code>function</code> - Return the callback function  
<a name="EventListener+scope"></a>

### eventListener.scope ⇒ <code>function</code>
**Kind**: instance property of [<code>EventListener</code>](#EventListener)  
**Returns**: <code>function</code> - Return the callback function scope  
<a name="EventListener+once"></a>

### eventListener.once ⇒ <code>boolean</code>
**Kind**: instance property of [<code>EventListener</code>](#EventListener)  
**Returns**: <code>boolean</code> - Returns true if it's a one time listener  
<a name="EventListener+emit"></a>

### eventListener.emit(event)
Emit the event to the listener function

**Kind**: instance method of [<code>EventListener</code>](#EventListener)  

| Param | Type |
| --- | --- |
| event | [<code>BusEvent</code>](#BusEvent) | 

<a name="EventListener+is"></a>

### eventListener.is(listener) ⇒ <code>boolean</code>
Check if the given callback is the same as the listener ones

**Kind**: instance method of [<code>EventListener</code>](#EventListener)  

| Param | Type |
| --- | --- |
| listener | <code>function</code> | 

<a name="EventBus"></a>

## EventBus
**Kind**: global class  

* [EventBus](#EventBus)
    * [new EventBus(name)](#new_EventBus_new)
    * _instance_
        * [.name](#EventBus+name) ⇒ <code>string</code>
        * [.register(channel, listener, [scope&#x3D;], [once])](#EventBus+register) ⇒ <code>function</code>
        * [.registerOnce(channel, listener, [scope&#x3D;])](#EventBus+registerOnce) ⇒ <code>function</code>
        * [.deregister(channel, listener)](#EventBus+deregister)
        * [.emit(channel, data)](#EventBus+emit) ⇒ [<code>EventBus</code>](#EventBus)
        * [.emitEvent(event)](#EventBus+emitEvent)
        * [.emitAsync(channel, data, [delay&#x3D;])](#EventBus+emitAsync) ⇒ [<code>EventBus</code>](#EventBus)
        * [.resendDeadEvents()](#EventBus+resendDeadEvents)
        * [.destroy()](#EventBus+destroy)
    * _static_
        * [.Errors](#EventBus.Errors)
        * [.BusEvent](#EventBus.BusEvent)
        * [.register()](#EventBus.register)
        * [.deregister()](#EventBus.deregister)
        * [.emit()](#EventBus.emit)

<a name="new_EventBus_new"></a>

### new EventBus(name)
The event bus constructor


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | [description] |

<a name="EventBus+name"></a>

### eventBus.name ⇒ <code>string</code>
**Kind**: instance property of [<code>EventBus</code>](#EventBus)  
**Returns**: <code>string</code> - Return the event bus name  
<a name="EventBus+register"></a>

### eventBus.register(channel, listener, [scope&#x3D;], [once]) ⇒ <code>function</code>
Method used to register a callback function on a specific channel

**Kind**: instance method of [<code>EventBus</code>](#EventBus)  
**Returns**: <code>function</code> - Returns a deregister function  
**Throws**:

- [<code>InvalidParameterGiven</code>](#InvalidParameterGiven) If [this condition is met]


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>string</code> |  | The given channel |
| listener | <code>function</code> |  | The callback function |
| [scope=] | <code>function</code> |  | The callback function scope |
| [once] | <code>boolean</code> | <code>false</code> | If it should deregister after first event |

<a name="EventBus+registerOnce"></a>

### eventBus.registerOnce(channel, listener, [scope&#x3D;]) ⇒ <code>function</code>
Method used to register a callback function on a specific channel

**Kind**: instance method of [<code>EventBus</code>](#EventBus)  
**Returns**: <code>function</code> - Returns a deregister function  
**Throws**:

- [<code>InvalidParameterGiven</code>](#InvalidParameterGiven) If [this condition is met]


| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The given channel |
| listener | <code>function</code> | The callback function |
| [scope=] | <code>function</code> | The callback function scope |

<a name="EventBus+deregister"></a>

### eventBus.deregister(channel, listener)
Deregister a function from the event bus

**Kind**: instance method of [<code>EventBus</code>](#EventBus)  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The listening channel |
| listener | <code>function</code> | The listener function |

<a name="EventBus+emit"></a>

### eventBus.emit(channel, data) ⇒ [<code>EventBus</code>](#EventBus)
Emit an event to a channel

**Kind**: instance method of [<code>EventBus</code>](#EventBus)  
**Returns**: [<code>EventBus</code>](#EventBus) - Returns the current instance of the EventBus  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The event channel |
| data | <code>\*</code> | The event data |

<a name="EventBus+emitEvent"></a>

### eventBus.emitEvent(event)
Emit a bus event

**Kind**: instance method of [<code>EventBus</code>](#EventBus)  

| Param | Type | Description |
| --- | --- | --- |
| event | [<code>BusEvent</code>](#BusEvent) | [description] |

<a name="EventBus+emitAsync"></a>

### eventBus.emitAsync(channel, data, [delay&#x3D;]) ⇒ [<code>EventBus</code>](#EventBus)
Method to emit an event async

**Kind**: instance method of [<code>EventBus</code>](#EventBus)  
**Returns**: [<code>EventBus</code>](#EventBus) - Returns the current instance of the EventBus  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The event channel |
| data | <code>\*</code> | The event data |
| [delay=] | <code>number</code> | The delay until the event will be send |

<a name="EventBus+resendDeadEvents"></a>

### eventBus.resendDeadEvents()
Start resending 'dead' events

**Kind**: instance method of [<code>EventBus</code>](#EventBus)  
<a name="EventBus+destroy"></a>

### eventBus.destroy()
Destroy the event bus

**Kind**: instance method of [<code>EventBus</code>](#EventBus)  
<a name="EventBus.Errors"></a>

### EventBus.Errors
Return all the errors type

**Kind**: static property of [<code>EventBus</code>](#EventBus)  
<a name="EventBus.BusEvent"></a>

### EventBus.BusEvent
Return the BusEvent class

**Kind**: static property of [<code>EventBus</code>](#EventBus)  
<a name="EventBus.register"></a>

### EventBus.register()
Method used to register a callback function on a specific channel

**Kind**: static method of [<code>EventBus</code>](#EventBus)  
**See**: EventBus.register  
<a name="EventBus.deregister"></a>

### EventBus.deregister()
Deregister a function from the event bus

**Kind**: static method of [<code>EventBus</code>](#EventBus)  
**See**: EventBus.deregister  
<a name="EventBus.emit"></a>

### EventBus.emit()
Emit an event to a channel

**Kind**: static method of [<code>EventBus</code>](#EventBus)  
**See**: EventBus.emit  
<a name="isFunction"></a>

## isFunction(fn) ⇒ <code>boolean</code>
Helper function to check if the given param is a function

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the given param is a function  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The given object |

<a name="toString"></a>

## toString(fn) ⇒ <code>string</code>
Helper function used to compare two functions

**Kind**: global function  
**Returns**: <code>string</code> - Returns the function as a string  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The given function |

