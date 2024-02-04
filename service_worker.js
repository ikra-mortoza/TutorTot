// THE VIDEO FACE GETTING STUFF
// Import the face-api.js library

const video = document.getElementById('video');

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  );
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  }, 100);
});

function isFaceDetected(video) {
  if (video.detections.length = 1 ) {
    return true;
  } else {
    return false;
  }
}
export { video, isFaceDetected };


// THE POPUP STUFF

// BUTTON ELEMENTS

const ele = document.getElementById("btn")
ele.addEventListener("click", () => {
    chrome.runtime.sendMessage({ time: "1" }, function (response) {
        console.log(response);
    });
});

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

var start = false;

startButton.onclick = function() {
    console.log("You clicked the start button!");
    start = true;
};


stopButton.onclick = function() {
    console.log("You clicked the stop button!");
    start = false;
};

// THIS IS THE NOTIFICATION STUFF

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

function checkFace() {
    while (start = true) {
        face = startVideo();
        FP = isFaceDetected(face);
        if (FP = false) {
             countdown(FP);
         }
    }
}

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


