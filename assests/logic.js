// Initialize Firebase
var config = {
  apiKey: "AIzaSyD2Nidn4ChtpH1GxiPOgG0fDHFc28-fIrk",
  authDomain: "trainscheduler-41970.firebaseapp.com",
  databaseURL: "https://trainscheduler-41970.firebaseio.com",
  projectId: "trainscheduler-41970",
  storageBucket: "trainscheduler-41970.appspot.com",
  messagingSenderId: "290652574844"
};
console.log("hello");
firebase.initializeApp(config);

/*****************************
         VARIABLES
    *****************************/
var database = firebase.database();
var newTrain;
var frequency;
var nextArrival;
var minutesAway;

/*****************************
         CLICK EVENTS
    *****************************/
// SUBMIT BUTTON TO ADD A TRAIN
$("#button").on("click", function() {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#trainName")
    .val()
    .trim();
  var destName = $("#destName")
    .val()
    .trim();
  var firstTrainStart = $("#firstTrainStart")
    .val()
    .trim(); // "DD/MM/YY").format("X")
  var frequencyMin = $("#frequencyMin")
    .val()
    .trim();

  //Calls a function that updates Firebase
  // upDateDb();
  newTrain = {
    TrainName: trainName,
    Destination: destName,
    FirstTrain: firstTrainStart,
    Frequency: frequencyMin
  };

  // Uploads user Input (New Train) data to the database
  database.ref().push(newTrain);
  // Clears each line of the submit form
  $("#trainName").val("");
  $("#destName").val("");
  $("#firstTrainStart").val("");
  $("#frequencyMin").val("");
});

// Firebase watcher + initial loader + order/limit is 1
database.ref().on(
  "child_added",
  function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // translates BD object back into JS variables
    trainName = sv.TrainName;
    destName = sv.Destination;
    firstTrainStart = sv.FirstTrain;
    frequencyMin = sv.Frequency;

    //tranlating time format to number format
    var timeArr = firstTrainStart.split(":");

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment()
      .hours(timeArr[0])
      .minutes(timeArr[1]);
    console.log("firstTimeConverted: " + firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequencyMin;
    console.log(tRemainder);

    // Minute Until Train
    var MinutesTillTrain = frequencyMin - tRemainder;
    console.log("MINUTES TILL TRAIN: " + MinutesTillTrain);

    // Next Train
    var nextTrainArrival = moment()
      .add(MinutesTillTrain, "m")
      .format("hh:mm A");
    console.log(" nexttrainArrival: " + nextTrainArrival);
    var nextTrain = moment().add(MinutesTillTrain, "m mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Add each train's data into the table
    $("#trainInfo").append(
      "<tr><td>" +
        trainName +
        "</td>" +
        "<td>" +
        destName +
        "</td>" +
        "<td>" +
        frequencyMin +
        "</td>" +
        "<td>" +
        nextTrainArrival +
        "</td>" +
        "<td>" +
        MinutesTillTrain +
        "</td></tr>"
    );

    // Handle the errors
  },

  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
