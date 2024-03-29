// Full spec-compliant TodoMVC with localStorage persistence
// and hash-based routing in ~150 lines.

// localStorage persistence
var STORAGE_KEY = 'todos-vuejs-2.0'
var todoStorage = {
 /*
 This code is getting the todos from localStorage and parsing them into an array. 
 It then sets uid equal to the length of that array,
 which will be used as a unique id for each new item added.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
 /*
 This code is setting the local storage to a stringified version of the array.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

// visibility filters
var filters = {
  all: function (todos) {
    return todos
  },
 /*
 This code is filtering out the todos that are not completed.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed
    })
  },
 /*
 This code is filtering the todos array and returning an array of only completed todos.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed
    })
  }
}

// app Vue instance
var app = new Vue({
  // app initial state
  data: {
    todos: todoStorage.fetch(),
    newTodo: '',
    editedTodo: null,
    visibility: 'all'
  },

  // watch todos change for localStorage persistence
  watch: {
    todos: {
 /*
 This code is saving the todos array into local storage.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },

  // computed properties
  // https://vuejs.org/guide/computed.html
  computed: {
 /*
 This code is filtering the todos based on visibility
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    filteredTodos: function () {
      return filters[this.visibility](this.todos)
    },
 /*
 This code is checking to see if the length of the array returned by `filters.active` is greater than 0, 
 and returning true or false depending on that result.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    remaining: function () {
      return filters.active(this.todos).length
    },
    allDone: {
 /*
 This code is checking if the remaining value of the object is equal to 0.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
      get: function () {
        return this.remaining === 0
      },
 /*
 This code is setting the completed property of each todo object in the array to true or false.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value
        })
      }
    }
  },

  filters: {
 /*
 This code is checking if the number of items in an array is equal to 1. 
 If it's true, then return 'item' as a string. Otherwise, return 'items' as a string.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    pluralize: function (n) {
      return n === 1 ? 'item' : 'items'
    }
  },

  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
 /*
 This code is pushing a new todo object into the array. 
 The id of the object will be assigned by uid++,
  which is an incrementing number that starts at 0 and increments each time it's called.
 The title property of the todo object will be set equal to whatever value was in `this.newTodo` 
 (which we have access to because this function has access to `this`).
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    addTodo: function () {
      var value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      })
      this.newTodo = ''
    },

 /*
 This code is removing the todo from the array.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

 /*
 This code is setting the beforeEditCache to the title of the todo that was clicked on
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    editTodo: function (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

 /*
 This code is setting the editedTodo to null. 
 This will clear out any previous edits that were made and then set it back to null.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },

 /*
 This code is setting the editedTodo to null and then sets the title
  of that todo object equal to beforeEditCache.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    cancelEdit: function (todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },

 /*
 This code is filtering the todos array by only returning the active todos.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    removeCompleted: function () {
      this.todos = filters.active(this.todos)
    }
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // https://vuejs.org/guide/custom-directive.html
  directives: {
 /*
 This code is setting the focus of an element to true
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
})

// handle routing
 /*
 This code is listening for a hash change event. 
 When it detects one, it will check to see if the hash value
 matches any of the keys in our filters object. 
 If so, we set `app.visibility` to that key's value (which is either 'all' or 'completed'). 
 Otherwise, we reset the hash back to an empty string and set `app.visibility` to 'all'.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
function onHashChange () {
  var visibility = window.location.hash.replace(/#\/?/, '')
  if (filters[visibility]) {
    app.visibility = visibility
  } else {
    window.location.hash = ''
    app.visibility = 'all'
  }
}

window.addEventListener('hashchange', onHashChange)
onHashChange()

// mount
app.$mount('.todoapp')
