// import { startVideo, video, isFaceDetected } from  "./script.js";
// import { startButton } from "./popup.js";


var notif_img = "happytott.png";
var msg = "";
var flag = 2;

function change_img() {
    if (flag==1) {
       notif_img = "happytott.png";
       msg = "Get back to work!!! You have 30 seconds"
    } else if (flag == 2) {
       notif_img = "confusedtot.png";
       msg = "HELLO! I SAID GET BACK TO WORK. 15 SECONDS OR ELSE"
    } else {
        notif_img = "angrytot.png";
        msg = "GET BACK TO WORK YOU FILTHY POOR EXCUSE OF A HUMAN BEING"
    }
}


chrome.alarms.onAlarm.addListener(
    () => {
        change_img();
        chrome.notifications.create(
            {
                type: "basic",
                iconUrl: notif_img,
                title: "TutorTot",
                message: msg, 
                   silent: false
            },
            () => { }
        )
    },
)
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        // if (video == true):
            //createAlarm();
        if (request.time)
            createAlarm();

        sendResponse(() => {
            return false
        });
    }
);

function createAlarm() {
    chrome.alarms.create(
        "TutorTots",
        {
            delayInMinutes: 1,
            periodInMinutes: 1
        }
    );
}

// function checkFace() {
//     while (startButton = true) {
//         face = startVideo();
//         FP = isFaceDetected(face);
//         if (FP = false) {
//              countdown(FP);
//          }
//     }
// }

function countdown(FP) {
    while (FP = false) {
        for (let i = 30; i >= 0; i--) {
            setTimeout(function() {
               console.log(i);
           }, 1000);
           if (FP = true) {
                break;
           }
       }
    }
}

countdown();
