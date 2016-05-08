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
**Kind**: instance property of <code>[BusEvent](#BusEvent)</code>  
**Returns**: <code>\*</code> - Returns the event data  
<a name="BusEvent+channel"></a>

### busEvent.channel ⇒ <code>string</code>
**Kind**: instance property of <code>[BusEvent](#BusEvent)</code>  
**Returns**: <code>string</code> - Returns the event channel  
<a name="BusEvent+timeStamp"></a>

### busEvent.timeStamp ⇒ <code>number</code>
**Kind**: instance property of <code>[BusEvent](#BusEvent)</code>  
**Returns**: <code>number</code> - Returns the event time stamp  
<a name="BusEvent+stopPropagation"></a>

### busEvent.stopPropagation()
Stop the event propagation

**Kind**: instance method of <code>[BusEvent](#BusEvent)</code>  
<a name="BusEvent+isEnable"></a>

### busEvent.isEnable() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[BusEvent](#BusEvent)</code>  
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
    * [new EventListener(options)](#new_EventListener_new)
    * [.channel](#EventListener+channel) ⇒ <code>string</code>
    * [.fn](#EventListener+fn) ⇒ <code>function</code>
    * [.scope](#EventListener+scope) ⇒ <code>function</code>

<a name="new_EventListener_new"></a>

### new EventListener(options)
Event Listener constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options object with params described below |
| options.channel | <code>string</code> | The channel on witch the events will be broadcast |
| options.scope | <code>function</code> | The listener scope |
| options.fn | <code>function</code> | The listener callback function |

<a name="EventListener+channel"></a>

### eventListener.channel ⇒ <code>string</code>
**Kind**: instance property of <code>[EventListener](#EventListener)</code>  
**Returns**: <code>string</code> - Return the listener channel  
<a name="EventListener+fn"></a>

### eventListener.fn ⇒ <code>function</code>
**Kind**: instance property of <code>[EventListener](#EventListener)</code>  
**Returns**: <code>function</code> - Return the callback function  
<a name="EventListener+scope"></a>

### eventListener.scope ⇒ <code>function</code>
**Kind**: instance property of <code>[EventListener](#EventListener)</code>  
**Returns**: <code>function</code> - Return the callback function scope  
<a name="EventBus"></a>

## EventBus
**Kind**: global class  

* [EventBus](#EventBus)
    * [new EventBus(name)](#new_EventBus_new)
    * _instance_
        * [.name](#EventBus+name) ⇒ <code>string</code>
        * [.register(channel, listener, scope)](#EventBus+register) ⇒ <code>function</code>
        * [.registerOnce(channel, listener, scope)](#EventBus+registerOnce) ⇒ <code>function</code>
        * [.deregister(channel, listener)](#EventBus+deregister)
        * [.emit(channel, data)](#EventBus+emit) ⇒ <code>[EventBus](#EventBus)</code>
        * [.emitEvent(busEvent)](#EventBus+emitEvent)
        * [.emitAsync(channel, data, delay)](#EventBus+emitAsync) ⇒ <code>[EventBus](#EventBus)</code>
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
**Kind**: instance property of <code>[EventBus](#EventBus)</code>  
**Returns**: <code>string</code> - Return the event bus name  
<a name="EventBus+register"></a>

### eventBus.register(channel, listener, scope) ⇒ <code>function</code>
Method used to register a callback function on a specific channel

**Kind**: instance method of <code>[EventBus](#EventBus)</code>  
**Returns**: <code>function</code> - Returns a deregister function  
**Throws**:

- <code>[InvalidParameterGiven](#InvalidParameterGiven)</code> If [this condition is met]


| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The given channel |
| listener | <code>function</code> | The callback function |
| scope | <code>function</code> | The callback function scope |

<a name="EventBus+registerOnce"></a>

### eventBus.registerOnce(channel, listener, scope) ⇒ <code>function</code>
Method used to register a callback function on a specific channel

**Kind**: instance method of <code>[EventBus](#EventBus)</code>  
**Returns**: <code>function</code> - Returns a deregister function  
**Throws**:

- <code>[InvalidParameterGiven](#InvalidParameterGiven)</code> If [this condition is met]


| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The given channel |
| listener | <code>function</code> | The callback function |
| scope | <code>function</code> | The callback function scope |

<a name="EventBus+deregister"></a>

### eventBus.deregister(channel, listener)
Deregister a function from the event bus

**Kind**: instance method of <code>[EventBus](#EventBus)</code>  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The listening channel |
| listener | <code>function</code> | The listener function |

<a name="EventBus+emit"></a>

### eventBus.emit(channel, data) ⇒ <code>[EventBus](#EventBus)</code>
Emit an event to a channel

**Kind**: instance method of <code>[EventBus](#EventBus)</code>  
**Returns**: <code>[EventBus](#EventBus)</code> - Returns the current instance of the EventBus  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The event channel |
| data | <code>\*</code> | The event data |

<a name="EventBus+emitEvent"></a>

### eventBus.emitEvent(busEvent)
Emit a bus event

**Kind**: instance method of <code>[EventBus](#EventBus)</code>  

| Param | Type | Description |
| --- | --- | --- |
| busEvent | <code>[BusEvent](#BusEvent)</code> | [description] |

<a name="EventBus+emitAsync"></a>

### eventBus.emitAsync(channel, data, delay) ⇒ <code>[EventBus](#EventBus)</code>
Method to emit an event async

**Kind**: instance method of <code>[EventBus](#EventBus)</code>  
**Returns**: <code>[EventBus](#EventBus)</code> - Returns the current instance of the EventBus  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The event channel |
| data | <code>\*</code> | The event data |
| delay | <code>integer</code> | The delay until the event will be send |

<a name="EventBus+resendDeadEvents"></a>

### eventBus.resendDeadEvents()
Start resending the 'dead' events if any

**Kind**: instance method of <code>[EventBus](#EventBus)</code>  
<a name="EventBus+destroy"></a>

### eventBus.destroy()
Destroy the event bus

**Kind**: instance method of <code>[EventBus](#EventBus)</code>  
<a name="EventBus.Errors"></a>

### EventBus.Errors
Return all the errors type

**Kind**: static property of <code>[EventBus](#EventBus)</code>  
<a name="EventBus.BusEvent"></a>

### EventBus.BusEvent
Return the BusEvent

**Kind**: static property of <code>[EventBus](#EventBus)</code>  
**Note**: Used for checking the event type  
<a name="EventBus.register"></a>

### EventBus.register()
Method used to register a callback function on a specific channel

**Kind**: static method of <code>[EventBus](#EventBus)</code>  
**See**: EventBus.register  
<a name="EventBus.deregister"></a>

### EventBus.deregister()
Deregister a function from the event bus

**Kind**: static method of <code>[EventBus](#EventBus)</code>  
**See**: EventBus.deregister  
<a name="EventBus.emit"></a>

### EventBus.emit()
Emit an event to a channel

**Kind**: static method of <code>[EventBus](#EventBus)</code>  
**See**: EventBus.emit  
