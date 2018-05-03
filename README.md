Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/full/PeKwOW/).

# The Task 

Following up the JavaScript Calculator, this project conitnues with the advanced, front-end challenges in the main curriculum @freecodecamp.

The task is to implement a pomodoro clock: set a timer for how much you want to work, set a timer for how much you want to take a break, start the clock. When the clock reaches 0, it begins the break time, at the end of which it repeats the described behavior.

The specific user stories to fulfill are:

- [ ] I can start a 25 minute pomodoro, at the end of which the timer will go off;
- [ ] I can reset the clock to set another pomodoro;
- [ ] I can alter the length of each pomodoro.

One pomodoro being the sum of work and break time.

# Versions

Instead of jotting down few pointers regarding the plan, or how I plan to tackle the project at hand, I decided to create the pomodoro clock in versions. Starting with a bare-bone webpage and progressively build features one at a time.

## V1

Have a header displaying a pre-established number of seconds. In the script set an interval of one second and at each iteration reduce said number, until 0.

```HTML
<div class="container">
    <h2 class="container__timer">
        10
    </h2>
</div>
```

```JS
const header = document.querySelector(".container__timer");

const intervalID = window.setInterval(countdownTimer, 1000);

function countdownTimer() {
    let headerText = parseInt(header.textContent);

    if(headerText == 0) {
        clearInterval(intervalID);
    } else {
        header.textContent = headerText - 1;
    }
    
}
```

## V2

Instead of just seconds, display minutes and seconds.

```HTML
<div class="container">
    <h2 class="container__timer">
      <span class="timer--minutes">0</span>
      :
      <span class="timer--seconds">02</span>
    </h2>
</div>
```

```JS
const minutes = document.querySelector(".timer--minutes");
const seconds = document.querySelector(".timer--seconds");

const intervalID = window.setInterval(countdownTimer, 1000);

function countdownTimer() {
    let secondsText = parseInt(seconds.textContent);

    if(secondsText == 0) {
        let minutesText = parseInt(minutes.textContent);
        if(minutesText == 0) {
            clearInterval(intervalID);
        }
        else {
            minutes.textContent = minutesText - 1;
            seconds.textContent = 59;
        }
    } else {
        seconds.textContent = secondsText - 1;
    }
}
```

### V2.5

Format the text as to show two digits for the number of seconds, always.

```JS
const minutes = document.querySelector(".timer--minutes");
const seconds = document.querySelector(".timer--seconds");

const intervalID = window.setInterval(countdownTimer, 1000);

function countdownTimer() {
    let secondsText = parseInt(seconds.textContent);

    if(secondsText == 0) {
        let minutesText = parseInt(minutes.textContent);
        if(minutesText == 0) {
            clearInterval(intervalID);
        }
        else {
            minutes.textContent = minutesText - 1;
            seconds.textContent = 59;
        }
    } else {
        seconds.textContent = secondsText - 1;
        if(secondsText -1 < 10) {
            seconds.textContent = "0" + seconds.textContent;
        }
    }
}
```

## V2.8

When the timer reaches 0, change the timer to a 1 minute 00 seconds timer.

```JS
const minutes = document.querySelector(".timer--minutes");
const seconds = document.querySelector(".timer--seconds");

const minutesWork = "0";
const secondsWork = "12";

const minutesBreak = "0";
const secondsBreak = "10";

timerWork();

function timerWork() {
    minutes.textContent = minutesWork;
    seconds.textContent = secondsWork;

    const intervalID = window.setInterval(function() {
        let secondsText = parseInt(seconds.textContent);

        if(secondsText == 0) {
            let minutesText = parseInt(minutes.textContent);
            if(minutesText == 0) {
                clearInterval(intervalID);
                timerBreak();
            }
            else {
                minutes.textContent = minutesText - 1;
                seconds.textContent = 59;
            }
        } else {
            seconds.textContent = secondsText - 1;
            if(secondsText -1 < 10) {
                seconds.textContent = "0" + seconds.textContent;
            }
        }  
    }, 1000);
    
}

function timerBreak() {
    minutes.textContent = "1";
    seconds.textContent = "00";
}
```

## V3

Alternate between timers, repeating endlessly a timer for work, a timer for breaks.

```JS
const minutes = document.querySelector(".timer--minutes");
const seconds = document.querySelector(".timer--seconds");

const minutesWork = "0";
const secondsWork = "12";

const minutesBreak = "0";
const secondsBreak = "10";

timerWork();

function timerWork() {
    minutes.textContent = minutesWork;
    seconds.textContent = secondsWork;

    const intervalID = window.setInterval(function() {
        let secondsText = parseInt(seconds.textContent);

        if(secondsText == 0) {
            let minutesText = parseInt(minutes.textContent);
            if(minutesText == 0) {
                clearInterval(intervalID);
                timerBreak();
            }
            else {
                minutes.textContent = minutesText - 1;
                seconds.textContent = 59;
            }
        } else {
            seconds.textContent = secondsText - 1;
            if(secondsText -1 < 10) {
                seconds.textContent = "0" + seconds.textContent;
            }
        }  
    }, 1000);
    
}

function timerBreak() {
    minutes.textContent = minutesBreak;
    seconds.textContent = secondsBreak;

    const intervalIDTwo = window.setInterval(function() {
        let secondsText = parseInt(seconds.textContent);

        if(secondsText == 0) {
            let minutesText = parseInt(minutes.textContent);
            if(minutesText == 0) {
                clearInterval(intervalIDTwo);
                timerWork();
            }
            else {
                minutes.textContent = minutesText - 1;
                seconds.textContent = 59;
            }
        } else {
            seconds.textContent = secondsText - 1;
            if(secondsText -1 < 10) {
                seconds.textContent = "0" + seconds.textContent;
            }
        }  
    }, 1000);
}
```

## V4 

Instead of default values, retrieve the number of minutes from the page, from two input sources describing the time frame of working and breaking minutrs.

```HTML
<div class="container">
    <div class="container__controls">
      <p class="controls--work">5</p>
      <p class="controls--break">1</p>
    </div>
    <h2 class="container__timer">
        10
    </h2>
</div>
```

```JS
const minutes = document.querySelector(".timer--minutes");
const seconds = document.querySelector(".timer--seconds");



const minutesWork = document.querySelector(".controls--work").textContent;

const secondsWork = "00";

const minutesBreak = document.querySelector(".controls--break").textContent;
const secondsBreak = "00";

// rest of the JS script
```

### V4.5

Start the timers and therefore retrieve the input numbers only when clicking on the timer itself. Don't run the function immediately.

```JS
const timer = document.querySelector(".container__timer");
const minutes = document.querySelector(".timer--minutes");
const seconds = document.querySelector(".timer--seconds");


timer.addEventListener("click", timerWork);
```

## V5

Instead of hard-coded values, give the possibility to increment/decrement the working and breaks time.

```HTML
<div class="container__controls">
    <div class="controls--work">
        <span class="controls--change" data-value="-">-</span>
        <span class="change--minutes">5</span>
        <span class="controls--change" data-value="+">+</span>
    </div>
    <div class="controls--break">
        <span class="controls--change" data-value="-">-</span>
        <span class="change--minutes">1</span>
        <span class="controls--change" data-value="+">+</span>
    </div>
</div>
```

```JS
const controlsTimer = document.querySelectorAll(".controls--change");

controlsTimer.forEach(controlTimer => controlTimer.addEventListener("click", updateTimer));

function updateTimer(event) {
    const changeMinutes = event.target.parentElement.querySelector(".change--minutes");
    const changeMinutesValue = parseInt(changeMinutes.textContent);

    if(event.target.dataset.value == "-" && changeMinutesValue > 1) {
        changeMinutes.textContent = changeMinutesValue - 1;
    }   
    else if(event.target.dataset.value == "+") {
        changeMinutes.textContent = changeMinutesValue + 1;
    }
}
```

The span to be affected is targeted by traversing the DOM. 

```JS
const changeMinutes = event.target.parentElement.querySelector(".change--minutes");
```

From the clicked element, the container is retrieved through `parentElement`. From this, the specific element is found through a `querySelector()` method. This is indeed applicable on the entire document or other HTML elements.

## V6

Attach the change in the values just implemented to the main timer, altering the number of minutes to be displayed.

```JS
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
```

## V7

Think about the semantics of the project. For instance, is a `span` element the best fit for what seems to be a button?

```JS
<div class="controls--work">
  <h2>Work</h2>
  <!-- each div has two buttons which surround and modify a number in a span  -->
  <button title="Reduce working time" class="controls--change" data-value="-">-</button>
  <span class="change--minutes">1</span>
  <button title="Increase working time" class="controls--change" data-value="+">+</button>
</div>
```

## V8

Embellish the project.
