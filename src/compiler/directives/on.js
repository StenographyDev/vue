/* @flow */

import { warn } from 'core/util/index'

 /*
 This code is doing the following.
  It's wrapping the code in a function that takes two arguments, `el` and `dir`.
  The first argument is an ASTElement object which represents a DOM element.
  The second argument is an ASTDirective object which represents a directive on this element. 
  We're checking to see if there are modifiers on this directive (which we don't support).
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
export default function on (el: ASTElement, dir: ASTDirective) {
  if (process.env.NODE_ENV !== 'production' && dir.modifiers) {
    warn(`v-on without argument does not support modifiers.`)
  }
  el.wrapListeners = (code: string) => `_g(${code},${dir.value})`
}
