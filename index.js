const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const originalButtonLabels = Array.from(buttons).map(btn => btn.textContent);

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

// --- Calculate function with separate Error & Undefined handling ---
function calculate() {
    let expression = display.value;
    expression = expression.replace(/x/g, "*");  
    expression = expression.replace(/÷/g, "/");  

    try {
        const result = eval(expression);

        // Check for Undefined result
        if (result === undefined || result === Infinity || isNaN(result)) {
            handleUndefined();
        } else {
            display.value = result;
        }
    } catch (error) {
        handleError();
    }
}

// --- Handle Undefined --- 
function handleUndefined() {
    display.value = "Undefined";
    buttons.forEach(btn => {
        btn.textContent = "?";
        btn.classList.add("undefined"); // add shake effect
    });

    setTimeout(resetButtons, 2000); // restore after 2s
}

// --- Handle Error ---
function handleError() {
    display.value = "Error";

    flashButtons();
    setTimeout(fallButtons, 500);
    setTimeout(resetButtons, 2000);
}

// --- Backspace ---
function backspace() {
    display.value = display.value.slice(0, -1);
}

// --- Flash buttons red ---
function flashButtons() {
    buttons.forEach(btn => {
        btn.classList.add("flash-red");
        btn.addEventListener('animationend', () => {
            btn.classList.remove("flash-red");
        }, { once: true });
    });
}

// --- Fall buttons off ---
function fallButtons() {
    buttons.forEach(btn => btn.classList.add("fall-off"));
}

// --- Reset buttons to original state ---
function resetButtons() {
    buttons.forEach((btn, index) => {
        btn.classList.remove("fall-off", "undefined"); // remove undefined effect
        btn.style.transform = "";
        btn.style.opacity = 1;

        // Restore original text
        btn.textContent = originalButtonLabels[index];
    });

    display.value = "";
}
