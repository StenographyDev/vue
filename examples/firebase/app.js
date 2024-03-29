var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Setup Firebase
var config = {
  apiKey: "AIzaSyAi_yuJciPXLFr_PYPeU3eTvtXf8jbJ8zw",
  authDomain: "vue-demo-537e6.firebaseapp.com",
  databaseURL: "https://vue-demo-537e6.firebaseio.com"
}
firebase.initializeApp(config)

var usersRef = firebase.database().ref('users')

// create Vue app
var app = new Vue({
  // element to mount to
  el: '#app',
  // initial data
  data: {
    newUser: {
      name: '',
      email: ''
    }
  },
  // firebase binding
  // https://github.com/vuejs/vuefire
  firebase: {
    users: usersRef
  },
  // computed property for form validation state
  computed: {
 /*
 This code is checking to see if the user has entered a name and an email address.
 If they have, it will return true for both of these conditions. 
 If either condition fails, then false will be returned.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    validation: function () {
      return {
        name: !!this.newUser.name.trim(),
        email: emailRE.test(this.newUser.email)
      }
    },
 /*
 This code is checking if all the keys in the validation object are true.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  // methods
  methods: {
 /*
 This code is pushing the new user to the database.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    addUser: function () {
      if (this.isValid) {
        usersRef.push(this.newUser)
        this.newUser.name = ''
        this.newUser.email = ''
      }
    },
 /*
 This code is removing the user from the database
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
 /*
 This code is removing the user from the database.
 - generated by stenography autopilot [ 🚗👩‍✈️ ] 
 */
    removeUser: function (user) {
      usersRef.child(user['.key']).remove()
    }
  }
})
