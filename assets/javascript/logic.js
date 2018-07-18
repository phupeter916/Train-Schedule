


$(document).ready(function(){




var config = {
    apiKey: "AIzaSyD850_gScz6t_T9CAmcyU12DwPeocvdyZ4",
    authDomain: "train-schedule-c0180.firebaseapp.com",
    databaseURL: "https://train-schedule-c0180.firebaseio.com",
    projectId: "train-schedule-c0180",
    storageBucket: "train-schedule-c0180.appspot.com",
    messagingSenderId: "1059797345563"
  };

  firebase.initializeApp(config);



  var database = firebase.database();

    $("#submitbutton").on("click", function() {
        event.preventDefault();
        
        database.ref().push({
        trainName: $("#trainName").val().trim(),
        destination: $("#destination").val().trim(),
        firstTrainTime: $("#firstTrainTime").val().trim(),
        frequency: $("#frequency").val().trim(),
        });
    });//end on onclick 


    database.ref().on("child_added", function(snapshot) {

        // get stuff for snapshot
          var trainName = snapshot.val().trainName;
          var destination= snapshot.val().destination;
          var firstTrainTime = snapshot.val().firstTrainTime;
          var frequency = snapshot.val().frequency;
        
        // add to the table
        var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(destination),
          $("<td>").text(firstTrainTime),
          $("<td>").text(frequency),
        );

        $("table").append(newRow);
    
        }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
        });

       


});