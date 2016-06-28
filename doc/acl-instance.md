# Acl Instance

The acl instance is what gets returned when calling the `aclManager.instance` method on
the acl manager. You can also choose to use the aclManager only as it has the
same methods as the `acl instance`

## Methods

<dl>
<dt><a href="#set">set(privs)</a> ⇒ <code>array</code></dt>
<dd></dd>
<dt><a href="#grant">grant(privs)</a> ⇒ <code>array</code></dt>
<dd></dd>
<dt><a href="#has">has(privs)</a> ⇒ <code>boolean</code></dt>
<dd><p>returns true when all the provided privs are part of the instance it&#39;s
privs</p>
</dd>
<dt><a href="#revoke">revoke(privs)</a> ⇒ <code>array</code></dt>
<dd><p>remove privs of the instance</p>
</dd>
<dt><a href="#get">get()</a> ⇒ <code>array</code></dt>
<dd><p>remove privs of the instance</p>
</dd>
</dl>

<a name="set"></a>

## set(privs) ⇒ <code>array</code>

| Param | Type |
| --- | --- |
| privs | <code>array</code> |

<a name="grant"></a>

## grant(privs) ⇒ <code>array</code>

| Param | Type |
| --- | --- |
| privs | <code>array</code> |

<a name="has"></a>

## has(privs) ⇒ <code>boolean</code>
returns true when all the provided privs are part of the instance it's
privs

**Returns**: <code>boolean</code> - true when contains all privs

| Param | Type |
| --- | --- |
| privs | <code>array</code> |

<a name="revoke"></a>

## revoke(privs) ⇒ <code>array</code>
remove privs of the instance


| Param | Type |
| --- | --- |
| privs | <code>array</code> |

<a name="get"></a>

## get() ⇒ <code>array</code>
get privs of the instance

