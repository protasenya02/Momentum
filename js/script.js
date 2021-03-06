// Dom Elements
const body = document.querySelector('body'),
    time = document.getElementById('time'),
    date = document.getElementById('date'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus'),
    nextBtn = document.getElementById('nextBtn'),
    quote = document.getElementById('quote'),
    quoteBtn = document.getElementById('quoteBtn');

const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'],
    timeOfDay = ['night', 'morning', 'day', 'evening'];

let textBuffer;
let base;
let imageCounter = 0;
let currTimeOfDay;

// Show Current Time
function showTime() {

    let today = new Date(),
        hour = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds(),
        weekDay = today.getDay(),
        dayNumber = today.getDate(),
        month = today.getMonth();

    // Output time
    time.innerHTML =`${addZero(hour)}<span>:</span>${addZero(minutes)}<span>:</span>${addZero(seconds)}`;
    date.innerHTML = `${daysOfWeek[weekDay]}<span>, </span>${dayNumber} ${months[month]}`;
    setTimeout(showTime,1000);
}

// Add Zeros
function addZero(numb) {
    return (parseInt(numb,10) < 10 ? '0' : '') + numb;
}

// Show Background Image
function showBackgroundImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}

// Get Background Image
function getBackgroundImage() {
    const index = imageCounter % images.length;
    const imageSrc = "images/" + timeOfDay[currTimeOfDay] + "/" + images[index];

    showBackgroundImage(imageSrc);
    imageCounter++;
    nextBtn.disabled = true;
    setTimeout(function() { nextBtn.disabled = false }, 1000);

    if (index === 0){
        currTimeOfDay++;
    }

    if(currTimeOfDay === 4) {
        currTimeOfDay = 0;
    }
}

// Set Background image ang Greeting
function setBackgroundAndGreeting() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 6) {
        // Night
        currTimeOfDay = 0;
        greeting.textContent = 'Good Night,';
        body.style.color = 'white';
    }else if (hour < 12) {
        // Morning
        currTimeOfDay = 1;
        greeting.textContent = 'Good Morning,';
        body.style.color = 'black';
    } else if (hour < 18) {
        // Afternoon
        currTimeOfDay = 2;
        greeting.textContent = 'Good Afternoon,';
        body.style.color = 'white';
    } else {
        // Evening
        currTimeOfDay = 3;
        greeting.textContent = 'Good Evening,';
    }

    // Changing Background Every Hour
    setTimeout(showTime, 1000 * 60 & 60);
    getBackgroundImage();
}

// Set Name
function setName(event) {
    if (event.type === 'keypress'){
        // If Enter Pressed
        if (event.keyCode === 13) {
            name.blur();
        }
    } else {
        // Check Input
        if ((name.textContent === '') || (/^\s*$/.test(name.innerText))) {
            name.textContent = textBuffer;
        }

        localStorage.setItem('name', event.target.innerText);
    }
}

// Get Name
function getName() {
    if (!localStorage.getItem('name')) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Focus
function setFocus(event) {
    if (event.type === 'keypress'){
        // If Enter Pressed
        if (event.keyCode === 13) {
            focus.blur();
        }
    } else {
        if ((focus.textContent === '') || (/^\s*$/.test(focus.innerText))) {
            focus.textContent = textBuffer;
        }

        localStorage.setItem('focus', event.target.innerText);
    }
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Get Quote
async function getQuote() {
    const url = `https://api.chucknorris.io/jokes/random`;
    const res = await fetch(url);
    const data = await res.json();
    quote.textContent = '"' + data.value + '"';
}


name.addEventListener('click', () => {
    textBuffer = name.textContent;
    name.textContent = '';
})
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('click', () => {
    textBuffer = focus.textContent;
    focus.textContent = '';
})
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

nextBtn.addEventListener('click', () => {
    getBackgroundImage(base);
});

quoteBtn.addEventListener('click', getQuote);

// Run
document.addEventListener('DOMContentLoaded', getQuote);
showTime();
setBackgroundAndGreeting();
getName();
getFocus();

