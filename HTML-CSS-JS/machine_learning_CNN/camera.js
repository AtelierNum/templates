let video = document.getElementById('video'); // Video element
let canvas = document.getElementById("canvas"); // Canvas to display the video stream in higher resolution
let ctx = canvas.getContext("2d"); // We assign a 2d space to the canvas


// We ask for permission to access the camera
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
}

// If the web page is loaded we launch the live function
window.addEventListener("DOMContentLoaded", () => {
    live();
});

// We display the video stream in the canvas
function live() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setTimeout(live, 0);
}