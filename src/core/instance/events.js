/* @flow */

import {
  tip,
  toArray,
  hyphenate,
  formatComponentName,
  invokeWithErrorHandling
} from '../util/index'
import { updateListeners } from '../vdom/helpers/index'

 /*
 This code is initializing the _events object on a component. This object will be used to store all of the event listeners that are attached to this component.
 The _hasHookEvent property is set to false, which means that no hook events have been added yet.
 This code also updates the parent's event listeners by calling updateComponentListeners().
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
export function initEvents (vm: Component) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false
  // init parent attached events
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}

let target: any

 /*
 This code is adding an event listener to the target object. The `$on` method on the target object takes two arguments,
 the first being a string representing the name of the event and second being a function that will be called when that
 event occurs.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
function add (event, fn) {
  target.$on(event, fn)
}

 /*
 This code is removing the function `fn` from the event listener for `event`.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
function remove (event, fn) {
  target.$off(event, fn)
}

 /*
 This code is creating a function that will be used to remove the event listener once it has been called
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
function createOnceHandler (event, fn) {
  const _target = target
  return function onceHandler () {
    const res = fn.apply(null, arguments)
    if (res !== null) {
      _target.$off(event, onceHandler)
    }
  }
}

 /*
 This code is updating the listeners of a component. It's doing this by calling updateListeners, which takes in three arguments. The first argument is an object containing all of the new listeners that are being added to the component, and the second argument is an optional old listener object (which we'll use later). The third argument is a function that adds a listener to our target element.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
export function updateComponentListeners (
  vm: Component,
  listeners: Object,
  oldListeners: ?Object
) {
  target = vm
  updateListeners(listeners, oldListeners || {}, add, remove, createOnceHandler, vm)
  target = undefined
}

export function eventsMixin (Vue: Class<Component>) {
  const hookRE = /^hook:/
 /*
 This code is adding a new event listener to the component. The first argument is an array of events, and the second argument is a function that will be called when one of those events occurs.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
  Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
    const vm: Component = this
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn)
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn)
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true
      }
    }
    return vm
  }

 /*
 This code is setting up a function that will be called when the event occurs. The `on` function
 is then assigned to an attribute on the component instance, and it's value is set to the 
 function created in this code block. This way we can call `vm.$off(event, on)` later on in our 
 code without having to worry about losing track of which functions are bound to which events.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
  Vue.prototype.$once = function (event: string, fn: Function): Component {
    const vm: Component = this
    function on () {
      vm.$off(event, on)
      fn.apply(vm, arguments)
    }
    on.fn = fn
    vm.$on(event, on)
    return vm
  }

 /*
 This code is removing the function from the array of functions
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
  Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component {
    const vm: Component = this
    // all
    if (!arguments.length) {
      vm._events = Object.create(null)
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$off(event[i], fn)
      }
      return vm
    }
    // specific event
    const cbs = vm._events[event]
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null
      return vm
    }
    // specific handler
    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return vm
  }

 /*
 This code is doing the following.
  It's creating a new array called cbs, which contains all of the callbacks for this event.
  Then it creates an array called args, which contains all of the arguments passed to this function (including vm).
  Finally it creates a variable info and sets it equal to `event handler for "${event}"`. This will be used in error handling later on.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
  Vue.prototype.$emit = function (event: string): Component {
    const vm: Component = this
    if (process.env.NODE_ENV !== 'production') {
      const lowerCaseEvent = event.toLowerCase()
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          `Event "${lowerCaseEvent}" is emitted in component ` +
          `${formatComponentName(vm)} but the handler is registered for "${event}". ` +
          `Note that HTML attributes are case-insensitive and you cannot use ` +
          `v-on to listen to camelCase events when using in-DOM templates. ` +
          `You should probably use "${hyphenate(event)}" instead of "${event}".`
        )
      }
    }
    let cbs = vm._events[event]
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs
      const args = toArray(arguments, 1)
      const info = `event handler for "${event}"`
      for (let i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info)
      }
    }
    return vm
  }
}
