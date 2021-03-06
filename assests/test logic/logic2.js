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

    //subtract one year to innsure no time conflicts over calculated microseconds.
    var firstTimeConverted = moment(firstTrainStart, "hh:mm").subtract(
      1,
      "years"
    );
    console.log("firstTimeConverted: " + firstTimeConverted);

    // firstTimeConvertedA = firstTimeConverted.format("hh:mm");
    // console.log(firstTimeConvertedA);

    // Splits the time value from a string to integers
    console.log(firstTrainStart);
    var timeArr = firstTrainStart.split(":"); //xx,xx (2 integers separated by comma)
    //variables for the hours and minutes - separated
    var hour = timeArr[0];
    var min = timeArr[1];

    var currentTime = moment().format("hh:mm");
    var currentTimeArr = currentTime.split(":");
    var curHour = currentTimeArr[0];
    var curMin = currentTimeArr[1];

//*********************************************************** */
    


function compareTime() {
      if (hour > curHour) {
    
        // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequencyMin;
    // console.log(tRemainder);

    // Minute Until Train

    // Next Train
    var nextTrainArrival = moment(firstTrainStart, "h:mm").format("hh:mm");
    // .add(MinutesTillTrain, "minutes")
    // .format("hh:mm A");
    console.log("next Train: " + nextTrainArrival);
    console.log("Firsttrain: " + firstTrainStart);

    var MinutesTillTrain = nextTrainArrival - moment();

    //frequencyMin - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + MinutesTillTrain);

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

      } else {
    // Difference between the times
    diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequencyMin;
    // console.log(tRemainder);

    // Minute Until Train

    // Next Train
    var nextTrainArrival = moment(firstTrainStart, "h:mm").format("hh:mm");
    // .add(MinutesTillTrain, "minutes")
    // .format("hh:mm A");
    console.log("next Train: " + nextTrainArrival);
    console.log("Firsttrain: " + firstTrainStart);

    var MinutesTillTrain = nextTrainArrival - moment();

    frequencyMin - tRemainder;
    console.log("MINUTES TILL TRAIN: " + MinutesTillTrain);

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
  }
  }
  // Handle the errors
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);

    


    compareTime();

   
    
 
  
  
