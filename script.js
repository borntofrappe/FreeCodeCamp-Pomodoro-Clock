/* target the HTML elements required for the script as they are used in the script */ 

/*
- header used to trigger the timer 
- span elements displaying the minutes and seconds of the timer

- controls to alter the duration of the timers

- header displaying the title of the projects (updated with each timer to describe the ongoing phase)
*/
const timerHeaderToggleInterval = document.querySelector(".container__timer");
const timerMinutes = document.querySelector(".timer--minutes");
const timerSeconds = document.querySelector(".timer--seconds");

const timerControls = document.querySelectorAll(".controls--change"); // returns a collection

const timerTitle = document.querySelector(".container__title");
// include array with the values which are to be assumed by the title and the tab of the document
const timerTitleValues = ["Working", "Break", "Stop", "Pomodoro Clock"];


// create a counter variable to allow for the click event to start/stop the timer depending on the number of "clicks"
let counter = 1;
// listen for a click event on the header, at which point toggle the timer beginning the first pomodoro (1 pomodoro = 1 working timer + 1 break timer)
timerHeaderToggleInterval.addEventListener("click", toggleTimer);

// declare a function which starts/stops the timer depending on the number of "clicks" on the header
// counter is incremented with each click, therefore 
// if even => there is an ongoing timer, stop it
// if odd => the timer is stopped/still not instantiated, begin counting down
function toggleTimer() {
    // ongoing timer
    if(counter % 2 == 0) {
        // as setInterval() generates an incrementally greater integer for the interval id, clear all intervals with identifier from 0 to 200
        // effectively stopping the timers (technically the first 200 hundred of them)
        for(let i = 0; i < 200; i++) {
            clearInterval(i);
        }
        // allow the controls from changing the values of the timer
        timerControls.forEach(timerControl => timerControl.addEventListener("click", updateTimerValues));
        // remove the visual block from the controls 
        timerControls.forEach(timerControl => timerControl.classList.remove("forbid"));

        // update the title of the page to "Stop" and the tab to "Pomodoro Clock"
        timerTitle.textContent = timerTitleValues[2];
        document.title = timerTitleValues[3];
        
    }
    // no ongoing timer
    else {
        // trigger a timer for a working session
        timerWork();

        // remove listener for a click event on all controls
        timerControls.forEach(timerControl => timerControl.removeEventListener("click", updateTimerValues));
        // include class of .forbid visually dis-allowing the change of the timer's values
        timerControls.forEach(timerControl => timerControl.classList.add("forbid"));
    }
    counter++;  
}

// declare a function for the timer describing the working session
function timerWork() {
    // change the text of the main header to describe the ongoing phase
    timerTitle.textContent = timerTitleValues[0];

    // retrieve the number of minutes from the control panel and use that as a variable updated every second with an interval
    let minutesWork = document.querySelector(".controls--work .controls--minutes").textContent;
    let secondsWork = "00";

    // set the text in the span elements to represent the digits specified in the controls' panel
    timerMinutes.textContent = minutesWork;
    timerSeconds.textContent = secondsWork;

    // begin an interval of 1 second, storing the ID in a variable used when clearing the interval
    const intervalIDWork = window.setInterval(function() {
        
        // if seconds is zero
        if(parseInt(secondsWork) == 0) {
            // if even minutes is zero clear the interval and begin the timer for the break session
            if(parseInt(minutesWork) == 0) {
                clearInterval(intervalIDWork);
                timerBreak();
            }
            // else reduce the number of minutes by 1 and set the number of seconds to 59
            else {
                minutesWork = parseInt(minutesWork) - 1;
                timerMinutes.textContent = minutesWork;
                secondsWork = 59;
                timerSeconds.textContent = secondsWork;
            }
        } 
        // if seconds is not zero reduce the number of seconds by 1
        else {
            secondsWork = parseInt(secondsWork) - 1;
            timerSeconds.textContent = secondsWork;
            // if seconds is less than 10, add 0 to maintain always two digits
            if(secondsWork < 10) {
                timerSeconds.textContent = "0" + timerSeconds.textContent;
            }
        }  
        // change the text on the tab to a text describing the phase and the countdown
        document.title = timerTitleValues[0] + " " + timerMinutes.textContent + ":" + timerSeconds.textContent;
    }, 1000);    
}


// declare a function for the timer describing the working session, eerily similar to the function used before for the working phase (space for improvements in terms of concise code)
function timerBreak() {
    timerTitle.textContent = timerTitleValues[1];

    let minutesBreak = document.querySelector(".controls--break .controls--minutes").textContent;
    let secondsBreak = "00";

    timerMinutes.textContent = minutesBreak;
    timerSeconds.textContent = secondsBreak;

    const intervalIDBreak = window.setInterval(function() {
        let secondsText = parseInt(timerSeconds.textContent);

        if(parseInt(secondsBreak) == 0) {
            if(parseInt(minutesBreak) == 0) {
                clearInterval(intervalIDBreak);
                timerWork();
            }
            else {
                minutesBreak = parseInt(minutesBreak) - 1;
                timerMinutes.textContent = minutesBreak;
                secondsBreak = 59;
                timerSeconds.textContent = secondsBreak;
            }
        } 
        else {
            secondsBreak = parseInt(secondsBreak) - 1;
            timerSeconds.textContent = secondsBreak  ;
            // if seconds is less than 10, add 0 to maintain always two digits
            if(secondsBreak < 10) {
                timerSeconds.textContent = "0" + timerSeconds.textContent;
            }
        }  
        document.title = timerTitleValues[1] + " " + timerMinutes.textContent + ":" + timerSeconds.textContent;
    }, 1000);
}


// listen for a click event on the settings icon, at which point toggle the panel of controls with the class of .active
const settingsPanel = document.querySelector(".container__controls");
const settingsIcon = document.querySelector(".container__settings");

settingsIcon.addEventListener("click", () => settingsPanel.classList.toggle("active"));


// listen for a click event on all controls, at which point change the values of the timers, both in the controls' panel and the timer's header
timerControls.forEach(timerControl => timerControl.addEventListener("click", updateTimerValues));

// declare a function to update the timer and the controls with the new value 
function updateTimerValues(event) {
    // using the information retrieved from the event, target the span element connected to the respective control button
    const changeMinutes = event.target.parentElement.querySelector(".controls--minutes");
    // retrieve its value as an integer
    const changeMinutesValue = parseInt(changeMinutes.textContent);

    // update the value with the increasing / decreasing logic described by the data-value attribute applied on each button
    // place a conditional to also include a lower bound of 1 minute
    if(event.target.dataset.value == "-" && changeMinutesValue > 1) {
        changeMinutes.textContent = changeMinutesValue - 1;

        // if the clicked control button refers to the working timer, update also the UI in terms of the timer in the header 
        if(event.target.parentElement.classList.contains("controls--work")) {
            timerMinutes.textContent = changeMinutes.textContent;
            timerSeconds.textContent = "00";
        }
    }   
    else if(event.target.dataset.value == "+") {
        changeMinutes.textContent = changeMinutesValue + 1;

        if(event.target.parentElement.classList.contains("controls--work")) {
            timerMinutes.textContent = changeMinutes.textContent;
            timerSeconds.textContent = "00";
            
        }      
    }
}


