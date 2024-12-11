document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const body = document.body;
    const h1 = document.querySelector("h1");
    const p = document.querySelector("p");
    const span = document.querySelectorAll("span");
    const btnColor = document.querySelectorAll(".btn");
    const resultColor = document.getElementById('result');
    const resetBtn = document.getElementById("reset");
    const delBtn = document.getElementById("delete");
    const equalBtn = document.getElementById("equal");

    const applyTheme = (value) => {

        body.className = body.className.replace(/theme-\d+/g, "").trim();
        body.classList.add(`theme-${value}`);

        const buttonGroups = [
            btnColor,
            [resetBtn],
            [delBtn],
            [equalBtn],
            [h1], 
            [p], 
            span,
            [slider],
            [resultColor],
        ];

        buttonGroups.forEach((group) => {
            group.forEach((btn) => {
                btn.className = btn.className.replace(/theme-\d+/g, "").trim(); // Reset theme classes
                btn.classList.add(`theme-${value}`);
            });
        });
    };

    applyTheme(slider.value);

    slider.addEventListener("input", (event) => {
        const value = event.target.value;
        applyTheme(value);
    });
});

document.getElementById('result').textContent = '0';

function onClick(num) {
    const resultElement = document.getElementById('result'); 
    let currentDisplay = resultElement.textContent;

    if (currentDisplay === "0" && num >= '0' && num <= '9') {
        resultElement.textContent = num;
        return;
    }

    if (currentDisplay === '0' && num === '-'){
        resultElement.textContent = '-';
        return;
    }

    if (currentDisplay === "" || currentDisplay === "ERROR") {
        if (['+', '-', '/', '*'].includes(num)) {
            return;  
        }
        resultElement.textContent = num;
        return;
    }

    if (['+', '-', '/', '*'].includes(num) && ['+', '-', '/', '*'].includes(currentDisplay.slice(-1))) {
        return;
    }

    resultElement.textContent += num;
}


function del() {
    const resultElement = document.getElementById('result');
    let currentDisplay = resultElement.textContent;

    if (currentDisplay.length > 1) {
        resultElement.textContent = currentDisplay.slice(0, -1);
    } else {
        resultElement.textContent = "0"; 
    }
}

function reset() {
    const resultElement = document.getElementById('result');
    resultElement.textContent = "0"
}

function evaluateResult() {
    const resultElement = document.getElementById('result');
    try {
        resultElement.textContent = eval(resultElement.textContent);
    } catch (e) {
        resultElement.textContent = "ERROR";
    }
}