


$(document).ready(function () {




  var config = {
    apiKey: "AIzaSyCNYB-kfnVLn8g0JwdhzqtFy946iEZCOg4",
    authDomain: "myfirstdbproject-1c14b.firebaseapp.com",
    databaseURL: "https://myfirstdbproject-1c14b.firebaseio.com",
    projectId: "myfirstdbproject-1c14b",
    storageBucket: "myfirstdbproject-1c14b.appspot.com",
    messagingSenderId: "859563018756"
  };

  firebase.initializeApp(config);



  var database = firebase.database();

  $("#submitbutton").on("click", function () {
    event.preventDefault();

    database.ref().push({
      trainName: $("#trainName").val().trim(),
      destination: $("#destination").val().trim(),
      firstTrainTime: $("#firstTrainTime").val().trim(),
      frequency: $("#frequency").val().trim(),
    });


  });//end on onclick 


  database.ref().on("child_added", function (snapshot) {

    // get stuff for snapshot
    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var tFrequency = snapshot.val().frequency;
    var firstTime = snapshot.val().firstTrainTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    // add to the table
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(tFrequency),
      $("<td>").text(moment(nextTrain).format("hh:mm")),
      $("<td>").text(tMinutesTillTrain),
    );

    $("table").append(newRow);

  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });


});


