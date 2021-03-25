var eachHour = $(".each-hour");
var hourNow = moment().hours();
var taskPlanner = [];

$("#currentDay").text(moment().format("dddd, MMM Do YYYY, h:mm A"));

//style all hours depending on current time
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


//when user reloads page, load any tasks from local storage
function loadScheduler() {
    var grabInfo = JSON.parse(localStorage.getItem("taskPlanner"));
    taskPlanner = grabInfo;

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




//load document, and run  functions
$(document).ready(function() {
    initiateHours();
    loadScheduler();
});

