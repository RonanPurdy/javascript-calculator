// Get the display element
const display = document.getElementById("display");

// Append a value (number/operator) to the display
function appendToDisplay(input) {
    display.value += input;
}

// Clear the display
function clearDisplay() {
    display.value = "";
}

// Calculate the result of the expression
function calculate() {
    try {
        let expression = display.value;

        // Replace symbols for calculation
        expression = expression.replace(/×/g, "*");  
        expression = expression.replace(/÷/g, "/");  

        // Evaluate and show result
        display.value = eval(expression);
    } catch (error) {
        display.value = "Error";

        flashButtons();
        setTimeout(fallButtons, 1000);

        //Reset Buttons
        setTimeout(resetButtons, 3000)
    }
}

// Remove the last character from the display
function backspace() {
    display.value = display.value.slice(0, -1);
}

// --- Button Flash Animation ---
function flashButtons() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => {
        btn.classList.add("flash-red");
        // Remove the class after the animation ends
        btn.addEventListener('animationend', () => {
            btn.classList.remove("flash-red");
        }, { once: true });
    });
}

// --- Button Fall Animation ---
function fallButtons() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => {
        btn.classList.add("fall-off");
    });
}

//reset buttons
function resetButtons() {
    const buttons = document.querySelectorAll("button")
    buttons.forEach(btn => {
        btn.classList.remove("fall-off")
        btn.style.transform = "";
        btn.style.opacity = 1;
    });

    //Clear Display
    display.value = "";
}
