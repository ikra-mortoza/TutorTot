
// BUTTON ELEMENTs

// const ele = document.getElementById("btn")
// ele.addEventListener("click", () => {
//     chrome.runtime.sendMessage({ time: "1" }, function (response) {
//         console.log(response);
//     });
// });

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

var start = false;

startButton.onclick = function() {
    console.log("You clicked the start button!");
    start = true;
    return start;
};


stopButton.onclick = function() {
    console.log("You clicked the stop button!");
    start = false;
    return start;
};

// export { startButton }