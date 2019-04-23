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

    var momentTrain = moment(firstTrain, "HH:mm A").format("HH:mm")
    console.log(momentTrain);

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
        momentTrain: momentTrain,
        frequency: frequency
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


    // var momentInst = moment(empStart, "MM/DD/YYY")
    // var empMonths = momentInst.diff(moment(), "months") * -1;


    var tBody = $("tbody");
    var tRow = $("<tr>");

    var trainTd = $("<td>").text(trainName);
    var destinationTd = $("<td>").text(trainDestination);
    var trainFrequencyTd = $("<td>").text(trainFrequency);
    var nextArrivalTd = $("<td>").text("Logic needed for next arrival!!");
    var minutesAwayTd = $("<td>").text("Logic needed for minutes away!!");
    var firstTrainTd = $("<td>").text(trainFirst);

    tRow.append(trainTd, destinationTd, trainFrequencyTd, nextArrivalTd, minutesAwayTd);
    tBody.append(tRow);


}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});