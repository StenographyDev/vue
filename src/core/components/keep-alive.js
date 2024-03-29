/* @flow */

import { isRegExp, remove } from 'shared/util'
import { getFirstComponentChild } from 'core/vdom/helpers/index'

type CacheEntry = {
  name: ?string;
  tag: ?string;
  componentInstance: Component;
};

type CacheEntryMap = { [key: string]: ?CacheEntry };

 /*
 This code is checking if the options object has a Ctor property. If it does, then we check to see if that Ctor has an options property. If it does, then we check to see if that options object has a name property.
 If there is no name property on the component's `options` object, then we return null (because this function should only be returning strings). Otherwise, we return the value of either `Ctor.options.name` or `opts.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
function getComponentName (opts: ?VNodeComponentOptions): ?string {
  return opts && (opts.Ctor.options.name || opts.tag)
}

 /*
 This code is checking if the name matches any of the patterns in an array.
 If it does, then return true. If not, then return false.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
function matches (pattern: string | RegExp | Array<string>, name: string): boolean {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

 /*
 This code is removing all the cache entries that are not in the filter function.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
function pruneCache (keepAliveInstance: any, filter: Function) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const entry: ?CacheEntry = cache[key]
    if (entry) {
      const name: ?string = entry.name
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

 /*
 This code is removing the cache entry for a component instance that has been destroyed.
 The `current` argument is used to determine if the current VNode matches the one in the cache.
 If it doesn't match, then we know that this component instance was removed from its parent and should be cleaned up.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
function pruneCacheEntry (
  cache: CacheEntryMap,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const entry: ?CacheEntry = cache[key]
  if (entry && (!current || entry.tag !== current.tag)) {
    entry.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

const patternTypes: Array<Function> = [String, RegExp, Array]

export default {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  methods: {
 /*
 This code is doing two things. First, it's adding the vnode to the cache with a key of `keyToCache`.
 Second, it's pruning an entry from the cache if there are more than max entries in the cache.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    cacheVNode() {
      const { cache, keys, vnodeToCache, keyToCache } = this
      if (vnodeToCache) {
        const { tag, componentInstance, componentOptions } = vnodeToCache
        cache[keyToCache] = {
          name: getComponentName(componentOptions),
          tag,
          componentInstance,
        }
        keys.push(keyToCache)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
        this.vnodeToCache = null
      }
    }
  },

  created () {
    this.cache = Object.create(null)
    this.keys = []
  },

  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    this.cacheVNode()
 /*
 This code is setting the `pruneCache` function to be called whenever a new value is added to the cache.
 The code block takes in an argument, which is a callback function that will be called every time a new value is added to the cache.
 This callback function takes in one argument, which is the name of each item being cached. The callback checks if any items match this name and returns true or false depending on whether it matches or not.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
 /*
 This code is setting the `pruneCache` function to be called whenever a new value is added to the cache
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  updated () {
    this.cacheVNode()
  },

  render () {
    const slot = this.$slots.default
    const vnode: VNode = getFirstComponentChild(slot)
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      const name: ?string = getComponentName(componentOptions)
      const { include, exclude } = this
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key)
      } else {
        // delay setting the cache until update
        this.vnodeToCache = vnode
        this.keyToCache = key
      }

      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}
