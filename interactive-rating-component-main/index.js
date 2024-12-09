const d1 = document.getElementById("c1");
const d2 = document.getElementById("c2");
const ys= document.getElementById("ys")
const buttons = document.querySelectorAll("button[data-placeholder]");
const subbutton = document.getElementById("subbutton");
let lastFocusedButton = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        lastFocusedButton = button;
    });
});

subbutton.addEventListener("click", (event)=> {
    event.preventDefault;
    if (lastFocusedButton){
        const dataValue = lastFocusedButton.dataset.placeholder;
        ys.textContent = "You selected " + dataValue + " out of 5";
    }
    else{
        ys.textContent = "No button is selected"
    }
    d1.style.display = "none";
    d2.style.display = "block";
});