let body = document.querySelector("body");
let h2 = document.querySelector("h3");
let allBtns = document.querySelectorAll(".btn");

let btn = ["btn1", "btn2", "btn3", "btn4"];
let gameSequence = [];
let userSeuence = [];
let start = false;
let level = 0;

// Function to disable all buttons
const disableBtns = () => {
    allBtns.forEach((btn) => {
        btn.disabled = true;
        btn.style.opacity = "0.5";
    });
};

disableBtns();

// Function to enable all buttons
const enableBtns = () => {
    allBtns.forEach((btn) => {
        btn.disabled = false;
        btn.style.opacity = "1";
    });
};

// Start game for any key press
document.addEventListener("keypress", function () {
    if (!start) {
        h2.style.color = "black";
        enableBtns();
        start = true;
        upLevel();
    }
});

//Function of Flashing a button
function flashBtn(btn) {
    btn.classList.add("flash");
    // Remove flash class after 150ms
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 150);
}

//Function of Flashing a button by user
function userFlashBtn(btn) {
    btn.classList.add("userFlash");
    // Remove flash class after 100ms
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 100);
}

function upLevel() {
    userSeuence = []; // We need to empty this list because after each level increment the user need to be press all the sequenced keys.
    level++;
    h2.innerText = `Level ${level}`;

    // Chose Random button
    let randomInd = Math.floor(Math.random() * 3);
    let randomClass = btn[randomInd];
    gameSequence.push(randomClass); // Push the flashing button on the empty list
    let randomBtn = document.querySelector(`.${randomClass}`); // Get a random btn based on generated random class

    // Call the flasBtn function after 250ms
    setTimeout(function () {
        flashBtn(randomBtn);
    }, 250);
}

function findMatching(ind) {
    if (userSeuence[ind] == gameSequence[ind]) {
        if (userSeuence.length == gameSequence.length) {
            setTimeout(upLevel, 500);
            h2.style.color = "black";
        }
    } else {
        setTimeout(function () {
            h2.innerHTML = `Game Over! Your score was <b>${level}</b><br> Press any key to start.`;
            body.style.backgroundColor = "red";
            setTimeout(function () {
                body.style.backgroundColor = "wheat";
            }, 150);
            h2.style.color = "red";
            disableBtns();
            restGame();
        }, 100);
    }
}

function btnPress() {
    if (!this.disabled) {
        let btn = this;
        userFlashBtn(btn); // Flash the clicked btn by user
        userClass = btn.getAttribute("id"); // Get the class of clicked btn by user
        userSeuence.push(userClass);
        findMatching(userSeuence.length - 1); // Here the current ind is the same value of userSequence length value.
    }
}

for (btns of allBtns) {
    btns.addEventListener("click", btnPress);
}

function restGame() {
    start = false; // For this it start over by pressing any key again
    userSeuence = [];
    gameSequence = [];
    level = 0;
}
