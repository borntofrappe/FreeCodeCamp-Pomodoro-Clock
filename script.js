/*
UNFINISHED PROJECT

STILL WORKING ON IT
*/ 

/* target the HTML elements required for the script 
- header displaying the timer
- span elements displaying the minutes and seconds

- controls to alter the duration of the timers

- header displaying the title of the projects (updated with each timer to resemble the ongoing phase)
*/
const timer = document.querySelector(".container__timer");
const minutes = document.querySelector(".timer--minutes");
const seconds = document.querySelector(".timer--seconds");

const controlsTimer = document.querySelectorAll(".controls--change"); // returns a collection

const titlePage = document.querySelector(".container__title");
const titleValue = ["working", "break"];


// listen for a click event on the header, at which point start the pomodoro (with repeating timers for working and breaking sessions)
timer.addEventListener("click", timerWork);


// declare a function for the timer describing the working session
function timerWork() {
    // change the text of the main header to describe the ongoing phase
    titlePage.textContent = titleValue[0];

    // retrieve the number of minutes from the control panel and use that as a variable updated every second with an interval
    let minutesWork = document.querySelector(".controls--work .change--minutes").textContent;
    let secondsWork = "00";

    minutes.textContent = minutesWork;
    seconds.textContent = secondsWork;

    // begin an interval of 1 second, storing the ID in a variable used when clearing the interval
    const intervalIDWork = window.setInterval(function() {

        // if seconds is zero
        if(parseInt(secondsWork) == 0) {
            // if even minutes is zero clear the interval and begin the timer for the break 
            if(parseInt(minutesWork) == 0) {
                clearInterval(intervalIDWork);
                timerBreak();
            }
            // else reduce the number of minutes by 1 and set the number of seconds to 59
            else {
                minutesWork = parseInt(minutesWork) - 1;
                minutes.textContent = minutesWork;
                secondsWork = 59;
                seconds.textContent = secondsWork;
            }
        } 
        // if seconds is not zero reduce the number of seconds by 1
        else {
            secondsWork = parseInt(secondsWork) - 1;
            seconds.textContent = secondsWork;
            // if seconds is less than 10, add 0 to maintain always two digits
            if(secondsWork -1 < 10) {
                seconds.textContent = "0" + seconds.textContent;
            }
        }  
    }, 1000);    
}


// declare a function for the break session, eerily similar to the function used before for the working phase
function timerBreak() {
    // change the text of the title according to the purpose of the timer
    titlePage.textContent = titleValue[1];

    let minutesBreak = document.querySelector(".controls--break .change--minutes").textContent;
    let secondsBreak = "00";

    minutes.textContent = minutesBreak;
    seconds.textContent = secondsBreak;

    const intervalIDBreak = window.setInterval(function() {
        let secondsText = parseInt(seconds.textContent);

        if(parseInt(secondsBreak) == 0) {
            if(parseInt(minutesBreak) == 0) {
                clearInterval(intervalIDBreak);
                timerWork();
            }
            else {
                minutesBreak = parseInt(minutesBreak) - 1;
                minutes.textContent = minutesBreak;
                secondsBreak = 59;
                seconds.textContent = secondsBreak;
            }
        } 
        else {
            secondsBreak     = parseInt(secondsBreak    ) - 1;
            seconds.textContent = secondsBreak  ;
            // if seconds is less than 10, add 0 to maintain always two digits
            if(secondsBreak  -1 < 10) {
                seconds.textContent = "0" + seconds.textContent;
            }
        }  
    }, 1000);
}


// listen for a click event on all controls
controlsTimer.forEach(controlTimer => controlTimer.addEventListener("click", updateTimerValues));

// declare a function to update the timer and the controls with the new value 
function updateTimerValues(event) {
    // using the information retrieved from the event, target the span element connected to the respective control
    const changeMinutes = event.target.parentElement.querySelector(".change--minutes");
    // retrieve its value as an integer
    const changeMinutesValue = parseInt(changeMinutes.textContent);

    // update the value with the increasing / decreasing logic described by the data-value attribute applied on each button
    if(event.target.dataset.value == "-" && changeMinutesValue > 1) {
        changeMinutes.textContent = changeMinutesValue - 1;

        if(event.target.parentElement.classList.contains("controls--work")) {
            minutes.textContent = changeMinutes.textContent;
        }
    }   
    else if(event.target.dataset.value == "+") {
        changeMinutes.textContent = changeMinutesValue + 1;

        if(event.target.parentElement.classList.contains("controls--work")) {
            minutes.textContent = changeMinutes.textContent;
        }      
    }
}