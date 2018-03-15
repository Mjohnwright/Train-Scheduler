         
         // Initialize Firebase
          var config = {
            apiKey: "AIzaSyD2Nidn4ChtpH1GxiPOgG0fDHFc28-fIrk",
            authDomain: "trainscheduler-41970.firebaseapp.com",
            databaseURL: "https://trainscheduler-41970.firebaseio.com",
            projectId: "trainscheduler-41970",
            storageBucket: "trainscheduler-41970.appspot.com",
            messagingSenderId: "290652574844"
          };
          firebase.initializeApp(config);




console.log("hello");

/*****************************
         VARIABLES
 *****************************/
clickCounter = 0;

console.log(clickCounter);



$("#button").on("click", function(){

clickCounter++
console.log(clickCounter);


database.ref().set( {
    clickcount: clickCounter
})

})
 /*****************************
         FUNCTIONS
 *****************************/