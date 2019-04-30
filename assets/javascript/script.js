var config = {
    apiKey: "AIzaSyAt5k1uVs1NDgoAn01KPhDwDnN-A-QsW7U",
    authDomain: "shockdatabase-d8f4e.firebaseapp.com",
    databaseURL: "https://shockdatabase-d8f4e.firebaseio.com",
    projectId: "shockdatabase-d8f4e",
    storageBucket: "shockdatabase-d8f4e.appspot.com",
    messagingSenderId: "482688225509"
};

firebase.initializeApp(config);
var database = firebase.database();
console.log(moment().format("DD/MM/YY hh:mm A"));


$("#add-train").on("click", function (event) {
    event.preventDefault();

    var train = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // Convert the first train to military time
    var momentTrain = moment(firstTrain, "HH:mm A");
    console.log(typeof momentTrain);

    // Grab the current time
    var currentTime = moment();
    console.log(currentTime);

    // Grab the difference of the current time with the upcoming train
    var differenceTime = momentTrain.diff(currentTime, "minutes") * -1;
    console.log("Difference between now entered time", differenceTime);

    // Get the remainder using %. Ex 10 divided by 3 = 3 with remaidner of 1. % finds
    var remainderCalc = differenceTime % frequency;
    console.log("Math Difference", remainderCalc);

    // Subtract the remainder from the frequency and store in a variable
    var untilArrival = frequency - remainderCalc
    console.log("until arrival is:", untilArrival);
    
    // Get the future time
    var futureTrainTime = currentTime.add(untilArrival, "m").format("HH:mm")
    console.log("future train time:" + futureTrainTime);

    var trainInfo = {
        train: train,
        destination: destination,
        momentTrain: momentTrain.format("HH:mm"),
        frequency: frequency,
        futureTrainTime: futureTrainTime,
        untilArrival:untilArrival
    }

    database.ref().push(trainInfo);

    $("#train-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");


});

database.ref().on("child_added", function (child) {

    var trainName = child.val().train;
    var trainDestination = child.val().destination;
    var trainFrequency = child.val().frequency;
    var trainFirst = child.val().momentTrain;
    var trainNext = child.val().futureTrainTime;
    var trainETA = child.val().untilArrival;


    var tBody = $("tbody");
    var tRow = $("<tr>");

    var trainTd = $("<td>").text(trainName);
    var destinationTd = $("<td>").text(trainDestination);
    var trainFrequencyTd = $("<td>").text(trainFrequency);
    var nextArrivalTd = $("<td>").text(trainNext);
    var minutesAwayTd = $("<td>").text(trainETA);
    var firstTrainTd = $("<td>").text(trainFirst);

    tRow.append(trainTd, destinationTd, trainFrequencyTd, nextArrivalTd, minutesAwayTd);
    tBody.append(tRow);


}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});