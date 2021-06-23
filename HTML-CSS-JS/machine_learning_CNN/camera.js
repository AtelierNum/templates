let video = document.getElementById('video'); // Element vidéo
let canvas = document.getElementById("canvas"); // Canvas pour afficher le flux vidéo en plus haute résolution
let ctx = canvas.getContext("2d"); // On attribu un espace 2d au canvas


// On demande l'autorisation d'accéder à la caméra
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
}

// Si la page web est chargé on lance la fonction live
window.addEventListener("DOMContentLoaded", () => {
    live();
});

// On affiche le flux vidéo dans le canvas
function live() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setTimeout(live, 0);
}