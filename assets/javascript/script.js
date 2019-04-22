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


$("#add-train").on("click", function (event) {
    event.preventDefault();

    var train = $("#train-input").val();
    var destination = $("#destination-input").val();
    var firstTrain = $("#first-train-input").val();
    var frequency = $("#frequency-input").val();

    // var momentInst = moment(start, "MM/DD/YYY")
    // var startMoment = moment(start).toNow();
    // console.log(startMoment);
    
    // var tBody = $("tbody");
    // var tRow = $("<tr>");

    // var nameTd = $("<td>").text(train);
    // var roleTd = $("<td>").text(destination);
    // var startTd = $("<td>").text(firstTrain);
    // var monthlyWorkedTd = $("<td>").text("test");
    // var monthlyRateTd = $("<td>").text(rate);
    // var totalTd = $("<td>").text("Too much son!!");


    // tRow.append(nameTd, roleTd, startTd, monthlyWorkedTd, monthlyRateTd, totalTd);
    // tBody.append(tRow);

    var trainInfo = {
        train: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    database.ref().push(trainInfo);

    $("#train-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#monthly-input").val("");


});

database.ref().on("child_added", function (child) {

    var trainName = child.val().train;
    var trainDestination = child.val().destination;
    var trainFirst = child.val().firstTrain;
    var trainFrequency = child.val().frequency;


    // var momentInst = moment(empStart, "MM/DD/YYY")
    // var empMonths = momentInst.diff(moment(), "months") * -1;


    var tBody = $("tbody");
    var tRow = $("<tr>");

    var trainTd = $("<td>").text(trainName);
    var destinationTd = $("<td>").text(trainDestination);
    var firstTrainTd = $("<td>").text(trainFirst);
    var trainFrequencyTd = $("<td>").text(trainFrequency);
    // var monthlyRateTd = $("<td>").text(empRate);
    // var totalTd = $("<td>").text("Too much son!!");

    tRow.append(trainTd, destinationTd, firstTrainTd, trainFrequencyTd)
    tBody.append(tRow);


}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});