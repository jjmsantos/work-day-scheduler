//load local object 
// initiate scheduler
//ensure all hours are color coded depending on time using moment.js
// allow user to click on text area to edit then save by clicking on savebtn
////ensure work schedule refreshes every 20mins
//and changes color depending on hour

//colour code all hours
var today = (".$currentDay");
var eachHour = $(".each-hour");
var hourNow = moment().hours();
var taskPlanner = [];

function initiateHours() {
    eachHour.each(function(){
        var row = $(this);
        var timeBlockHour = parseInt(row.attr("id"));

        if (timeBlockHour === hourNow) {
            row.addClass("present").removeClass("past future");
        }
        else if (timeBlockHour < hourNow) {
            row.addClass("past").removeClass("present future");
        }
        else {
            row.addClass("future").removeClass("present past");
        }
    })

};

function saveTasks() {
    //everytime save is clicked, saved the task + hour into taskPlanner object.
    $(".saveBtn").on("click", function() {
        var value = $(this).siblings(".task").val();
        var timeOfHour = $(this).parent().attr("id");

        taskPlanner.push({
            task: value, time: timeOfHour
        });
        localStorage.setItem("taskPlanner", JSON.stringify(taskPlanner));
  });
}

function loadScheduler() {
    var grabInfo = JSON.parse(localStorage.getItem("taskPlanner"));
    if (!grabInfo) {
        taskPlanner = grabInfo;
    }
    for(var i = 0; i < taskPlanner.length;i++) {
        var loadHour = taskPlanner[i].time;
        var loadTask = taskPlanner[i].task;

        $("#" + loadHour).children(".task").val(loadTask);
    }
}

//refresh time every 10 minutes (1s * 60) * 10 = 10mins 
setInterval(function() {
    initiateHours();
    console.log("time refreshed");
}, (1000 * 60) * 10)

$(document).ready(function() {
    initiateHours();
    saveTasks();
});

