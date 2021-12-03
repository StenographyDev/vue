/* @flow */

import { warn, extend, isPlainObject } from 'core/util/index'

 /*
 This code is creating a new object, and then it is assigning the data.on property to that object.
 Then, we are iterating over the value of our von directive (which should be an Object). We are using for in loop to iterate over all keys in this object.
 We are also checking if on[key] exists or not by using `if` statement. If it does exist, then we will concatenate ours with existing ones by using [].concat method which takes two arguments as input and returns a new array containing both arrays passed as argument. Otherwise, just assign ours to on[key].
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
export function bindObjectListeners (data: any, value: any): VNodeData {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      )
    } else {
      const on = data.on = data.on ? extend({}, data.on) : {}
      for (const key in value) {
        const existing = on[key]
        const ours = value[key]
        on[key] = existing ? [].concat(existing, ours) : ours
      }
    }
  }
  return data
}
