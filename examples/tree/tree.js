// demo data
var data = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        }
      ]
    }
  ]
}

// define the item component
Vue.component('item', {
  template: '#item-template',
  props: {
    model: Object
  },
 /*
 This code is setting the open property to false.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
  data: function () {
    return {
      open: false
    }
  },
  computed: {
 /*
 This code is checking if the model has children and then checks to see if there are any children.
 If there are no children, it will return false. If there are children, it will return true.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
 /*
 This code is checking if the current item is a folder
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
 /*
 This code is setting the children property of the model to an empty array. 
 Then it calls addChild() and sets open to true.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
 /*
 This code is pushing a new object into the children array of the model.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    addChild: function () {
      this.model.children.push({
        name: 'new stuff'
      })
    }
  }
})

// boot up the demo
var demo = new Vue({
  el: '#demo',
  data: {
    treeData: data
  }
})
