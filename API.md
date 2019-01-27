<a name="module_Paramoia"></a>

## Paramoia
Cure for being paranoia about parameters which are coming in every single wrong way to our functions.


* [Paramoia](#module_Paramoia)
    * [.includes(param, contain, [condition])](#module_Paramoia.includes) ⇒ <code>Boolean</code>
    * [.equals(param, types)](#module_Paramoia.equals) ⇒ <code>Boolean</code>
    * [.valid(param, whitelist)](#module_Paramoia.valid) ⇒ <code>Boolean</code>
    * [.has(param, key)](#module_Paramoia.has) ⇒ <code>Boolean</code>
    * [.values(param, types)](#module_Paramoia.values) ⇒ <code>Boolean</code>
    * [.empty(param)](#module_Paramoia.empty) ⇒ <code>Boolean</code>
    * [.min(param, threshold)](#module_Paramoia.min) ⇒ <code>Boolean</code>
    * [.max(param, threshold)](#module_Paramoia.max) ⇒ <code>Boolean</code>
    * [.Types](#module_Paramoia.Types) : <code>Object</code>
    * [.Include](#module_Paramoia.Include) : <code>Object</code>

<a name="module_Paramoia.includes"></a>

### Paramoia.includes(param, contain, [condition]) ⇒ <code>Boolean</code>
It checks if **param** includes **contain** or not.

**Kind**: static method of [<code>Paramoia</code>](#module_Paramoia)  
**Returns**: <code>Boolean</code> - Result of check.- `TRUE`: Check condition met.- `FALSE`: Check condition didn't meet.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| param | <code>Array.&lt;String&gt;</code> \| <code>Object.&lt;String, \*&gt;</code> |  | Parameter which will be checked. |
| contain | <code>Array.&lt;String&gt;</code> \| <code>Object.&lt;String, \*&gt;</code> |  | Parameter which will be checked against. |
| [condition] | <code>Number</code> | <code>Paramoia.Include.Must</code> | Parameter which indicates check condition: `Only`: **param** *can include less* than **contain** but different. `Must`: **param** *must include* **contain**. `MustOnly`: **param** *must only include* **contain**. You should use [Paramoia.Include.*](#module_Paramoia.Include) |

<a name="module_Paramoia.equals"></a>

### Paramoia.equals(param, types) ⇒ <code>Boolean</code>
It checks if **param** equals *at least* one of **types** or not.

**Kind**: static method of [<code>Paramoia</code>](#module_Paramoia)  
**Returns**: <code>Boolean</code> - Result of check.- `TRUE`: **param** DOES equal *at least* one of **types**.- `FALSE`: **param** DOES NOT equal any of **types**.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>\*</code> | Parameter which will be checked. |
| types | <code>Array.&lt;Number&gt;</code> \| <code>Number</code> | Parameter(s) which will be checked against. You should use [Paramoia.Types.*](#module_Paramoia.Types) |

<a name="module_Paramoia.valid"></a>

### Paramoia.valid(param, whitelist) ⇒ <code>Boolean</code>
It checks if **param** is one of **whitelist** or not.

**Kind**: static method of [<code>Paramoia</code>](#module_Paramoia)  
**Returns**: <code>Boolean</code> - Result of check.- `TRUE`: **param** IS one of **whitelist**.- `FALSE`: **param** IS NOT one of **whitelist**.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>Number</code> \| <code>String</code> | Parameter which will be checked. |
| whitelist | <code>Array.&lt;(Number\|String)&gt;</code> | Parameter which will be checked against. |

<a name="module_Paramoia.has"></a>

### Paramoia.has(param, key) ⇒ <code>Boolean</code>
It checks if **param** has **key** or not.

**Kind**: static method of [<code>Paramoia</code>](#module_Paramoia)  
**Returns**: <code>Boolean</code> - Result of check.- `TRUE`: **param** HAS **key**.- `FALSE`: **param** HAS NOT **key**.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>Array.&lt;String&gt;</code> \| <code>Object.&lt;String, \*&gt;</code> | Parameter which will be checked. |
| key | <code>String</code> | Parameter which will be checked against. |

<a name="module_Paramoia.values"></a>

### Paramoia.values(param, types) ⇒ <code>Boolean</code>
It checks if every value of **param** is one of **types** or not.

**Kind**: static method of [<code>Paramoia</code>](#module_Paramoia)  
**Returns**: <code>Boolean</code> - Result of check.- `TRUE`: **param** HAS values which are one of **types**.- `FALSE`: **param** HAS values which are NOT one of **types**.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>Array.&lt;\*&gt;</code> \| <code>Object.&lt;String, \*&gt;</code> | Parameter which will be checked. |
| types | <code>Array.&lt;Number&gt;</code> \| <code>Number</code> | Parameter(s) which will be checked against. You should use [Paramoia.Types.*](#module_Paramoia.Types) |

<a name="module_Paramoia.empty"></a>

### Paramoia.empty(param) ⇒ <code>Boolean</code>
It checks if **param** is *empty* or not.

**Kind**: static method of [<code>Paramoia</code>](#module_Paramoia)  
**Returns**: <code>Boolean</code> - Result of check.- `TRUE`: **param** IS *empty*.- `FALSE`: **param** IS NOT *empty*.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>String</code> \| <code>Array.&lt;\*&gt;</code> \| <code>Object.&lt;String, \*&gt;</code> | Parameter which will be checked. |

<a name="module_Paramoia.min"></a>

### Paramoia.min(param, threshold) ⇒ <code>Boolean</code>
It checks if **param** is not less than *threshold* or it is.

**Kind**: static method of [<code>Paramoia</code>](#module_Paramoia)  
**Returns**: <code>Boolean</code> - Result of check.- `TRUE`: **param** IS NOT less than *threshold*.- `FALSE`: **param** IS less than *threshold*.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>Number</code> \| <code>String</code> \| <code>Array.&lt;\*&gt;</code> \| <code>Object.&lt;String, \*&gt;</code> | Parameter which will be checked. |
| threshold | <code>Number</code> | Parameter which will be checked against. |

<a name="module_Paramoia.max"></a>

### Paramoia.max(param, threshold) ⇒ <code>Boolean</code>
It checks if **param** is not more than *threshold* or it is.

**Kind**: static method of [<code>Paramoia</code>](#module_Paramoia)  
**Returns**: <code>Boolean</code> - Result of check.- `TRUE`: **param** IS NOT more than *threshold*.- `FALSE`: **param** IS more than *threshold*.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>Number</code> \| <code>String</code> \| <code>Array.&lt;\*&gt;</code> \| <code>Object.&lt;String, \*&gt;</code> | Parameter which will be checked. |
| threshold | <code>Number</code> | Parameter which will be checked against. |

<a name="module_Paramoia.Types"></a>

### Paramoia.Types : <code>Object</code>
**Kind**: static typedef of [<code>Paramoia</code>](#module_Paramoia)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Number | <code>Number</code> | Number type. |
| String | <code>Number</code> | String type. |
| Boolean | <code>Number</code> | Boolean type. |
| Array | <code>Number</code> | Array type. |
| Object | <code>Number</code> | Object type. |
| Null | <code>Number</code> | Null type. |
| Undefined | <code>Number</code> | Undefined type. |

<a name="module_Paramoia.Include"></a>

### Paramoia.Include : <code>Object</code>
**Kind**: static typedef of [<code>Paramoia</code>](#module_Paramoia)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Only | <code>Number</code> | Only condition. |
| Must | <code>Number</code> | Must condition. |
| MustOnly | <code>Number</code> | Must only condition. |

