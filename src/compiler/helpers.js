/* @flow */

import { emptyObject } from 'shared/util'
import { parseFilters } from './parser/filter-parser'

type Range = { start?: number, end?: number };

/* eslint-disable no-unused-vars */
 /*
 This code is creating a function called baseWarn. The first argument is the message that will be displayed in the console when this function is called.
 The second argument, range, can be omitted or left out if it's not needed. If it's included then it should be an object with two properties, start and end (both of which are numbers).
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
export function baseWarn (msg: string, range?: Range) {
  console.error(`[Vue compiler]: ${msg}`)
}
/* eslint-enable no-unused-vars */

export function pluckModuleFunction<F: Function> (
  modules: ?Array<Object>,
  key: string
): Array<F> {
  return modules
    ? modules.map(m => m[key]).filter(_ => _)
    : []
}

 /*
 This code is adding a property to the element's props array.
 The code block is setting up an object with name, value and dynamic properties.
 This object will be added to the element's props array.
 The plain property of the element will be set to false because there are now properties on this element that aren't just text nodes (i.e., they have names).
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
export function addProp (el: ASTElement, name: string, value: string, range?: Range, dynamic?: boolean) {
  (el.props || (el.props = [])).push(rangeSetItem({ name, value, dynamic }, range))
  el.plain = false
}

 /*
 This code is adding an attribute to the element.
 The first line of code is checking if the dynamicAttrs array exists on the ASTElement object, and if it does not exist then we create a new array for us to add attributes to.
 If it does exist then we just use that existing array instead of creating a new one.
 Then we push our rangeSetItem function into that dynamicAttrs array with our name, value and dynamic parameters as arguments.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
export function addAttr (el: ASTElement, name: string, value: any, range?: Range, dynamic?: boolean) {
  const attrs = dynamic
    ? (el.dynamicAttrs || (el.dynamicAttrs = []))
    : (el.attrs || (el.attrs = []))
  attrs.push(rangeSetItem({ name, value, dynamic }, range))
  el.plain = false
}

// add a raw attr (use this in preTransforms)
 /*
 This code is adding a new attribute to the element. The `attrsMap` object is an associative array that maps attributes names to their values.
 The `attrsList` array contains objects with two properties, name and value. 
 The rangeSetItem function creates an object with these properties and adds it to the attrsList array.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
export function addRawAttr (el: ASTElement, name: string, value: any, range?: Range) {
  el.attrsMap[name] = value
  el.attrsList.push(rangeSetItem({ name, value }, range))
}

 /*
 This code is adding a new directive to the element.
 The `el.directives` array will be created if it doesn't exist, and then we push an object into that array with the name of the directive (e.g., vbind), rawName (e.g., bind), value, arg, isDynamicArg, and modifiers properties set to their respective values passed in as arguments from our addDirective function call below.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
export function addDirective (
  el: ASTElement,
  name: string,
  rawName: string,
  value: string,
  arg: ?string,
  isDynamicArg: boolean,
  modifiers: ?ASTModifiers,
  range?: Range
) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name,
    rawName,
    value,
    arg,
    isDynamicArg,
    modifiers
  }, range))
  el.plain = false
}

 /*
 This code is doing the following.
  It's creating a function that takes in two parameters, symbol and name.
  The first parameter is the modifier marker (e.g., "click", "mousedown")
  The second parameter is the event name (e.g.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
function prependModifierMarker (symbol: string, name: string, dynamic?: boolean): string {
  return dynamic
    ? `_p(${name},"${symbol}")`
    : symbol + name // mark the event as captured
}

 /*
 This code is doing the following things.
  It's creating a new object called `newHandler` and assigning it to an object with two properties, `value` and `dynamic`.
  The value property of this object is assigned the string that was passed in as the second argument to this function. This will be either a static or dynamic expression depending on whether we're dealing with a plain element (which doesn't have any modifiers) or an element that has modifiers attached to it.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
export function addHandler (
  el: ASTElement,
  name: string,
  value: string,
  modifiers: ?ASTModifiers,
  important?: boolean,
  warn?: ?Function,
  range?: Range,
  dynamic?: boolean
) {
  modifiers = modifiers || emptyObject
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    process.env.NODE_ENV !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.',
      range
    )
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) {
    if (dynamic) {
      name = `(${name})==='click'?'contextmenu':(${name})`
    } else if (name === 'click') {
      name = 'contextmenu'
      delete modifiers.right
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = `(${name})==='click'?'mouseup':(${name})`
    } else if (name === 'click') {
      name = 'mouseup'
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture
    name = prependModifierMarker('!', name, dynamic)
  }
  if (modifiers.once) {
    delete modifiers.once
    name = prependModifierMarker('~', name, dynamic)
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive
    name = prependModifierMarker('&', name, dynamic)
  }

  let events
  if (modifiers.native) {
    delete modifiers.native
    events = el.nativeEvents || (el.nativeEvents = {})
  } else {
    events = el.events || (el.events = {})
  }

  const newHandler: any = rangeSetItem({ value: value.trim(), dynamic }, range)
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers
  }

  const handlers = events[name]
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler)
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler]
  } else {
    events[name] = newHandler
  }

  el.plain = false
}

 /*
 This code is getting the raw attribute value from the element.
 The code block is checking if there's a colon in front of the name, and then it checks for vbind or von.
 If none of those are found, it returns whatever was passed to this function as an argument.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
export function getRawBindingAttr (
  el: ASTElement,
  name: string
) {
  return el.rawAttrsMap[':' + name] ||
    el.rawAttrsMap['v-bind:' + name] ||
    el.rawAttrsMap[name]
}

 /*
 This code is getting the value of a vbind attribute and parsing it as filters.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
export function getBindingAttr (
  el: ASTElement,
  name: string,
  getStatic?: boolean
): ?string {
  const dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name)
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    const staticValue = getAndRemoveAttr(el, name)
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
 /*
 This code is removing the attribute from the element's attributes list and also removes it from
 the element's attributes map. The reason for this is that we don't want to keep track of all
 attributes on an element in memory, so instead we just remove them when they are no longer needed.
 This way, if you need to access a particular attribute later on, you can simply look it up in the
 element's `attrsMap` object.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
export function getAndRemoveAttr (
  el: ASTElement,
  name: string,
  removeFromMap?: boolean
): ?string {
  let val
  if ((val = el.attrsMap[name]) != null) {
    const list = el.attrsList
    for (let i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1)
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name]
  }
  return val
}

 /*
 This code is removing the attribute from the element
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
export function getAndRemoveAttrByRegex (
  el: ASTElement,
  name: RegExp
) {
  const list = el.attrsList
  for (let i = 0, l = list.length; i < l; i++) {
    const attr = list[i]
    if (name.test(attr.name)) {
      list.splice(i, 1)
      return attr
    }
  }
}

 /*
 This code is setting the start and end of a range
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
function rangeSetItem (
  item: any,
  range?: { start?: number, end?: number }
) {
  if (range) {
    if (range.start != null) {
      item.start = range.start
    }
    if (range.end != null) {
      item.end = range.end
    }
  }
  return item
}
