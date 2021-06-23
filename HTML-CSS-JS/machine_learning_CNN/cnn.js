let label = ''; // Contient le label de chaque classe
let cnn; // Contient notre modèle
let consoleOutput = document.getElementById('console'); // Affiche des informations lier au modèle
let video = document.getElementById('video'); // Contient le flux vidéo
let NbEpochs = 20; // Nombre d'epochs

let class_1 = document.getElementById("class_1");
let class_2 = document.getElementById("class_2");
let class_3 = document.getElementById("class_3");
let train = document.getElementById("train");
let saveData = document.getElementById("saveData");
let loadData = document.getElementById("loadData");
let saveModel = document.getElementById("saveModel");
let loadModel = document.getElementById("loadModel");

// Configuration de notre modèle
let options = {
    task: 'imageClassification', // Regression|classification|imageClassification, déterminate la tache de notre modèle
    debug: true, // Affiche l'interface d'entrainement
    inputs: [video.width, video.height, 4], // Determine la forme de notre tableau d'entrée, 4 pour les couleurs 'rgba'
    layers: [{ // Architecture de notre modèle
            type: 'conv2d',
            filters: 8,
            kernelSize: 5,
            strides: 1,
            activation: 'relu',
            kernelInitializer: 'varianceScaling'
        },
        {
            type: 'maxPooling2d',
            poolSize: [2, 2],
            strides: [2, 2]
        },
        {
            type: 'conv2d',
            filters: 16,
            kernelSize: 5,
            strides: 1,
            activation: 'relu',
            kernelInitializer: 'varianceScaling'
        },
        {
            type: 'maxPooling2d',
            poolSize: [2, 2],
            strides: [2, 2],
        },
        {
            type: 'flatten'
        },
        {
            type: 'dense',
            kernelInitializer: 'varianceScaling',
            activation: 'softmax'
        }
    ]
};

cnn = ml5.neuralNetwork(options); // Assignation des options à notre modèle

// Fonction de rappel après l'entrainement du modèle
function finishedTraining() {
    consoleOutput.textContent = 'training complete';
    classifyVideo();
}

// Lancement de la classification qui prend vidéo en entré
function classifyVideo() {
    let inputImage = {
        image: video,
    };
    cnn.classify(inputImage, gotResults);
}

// Affiche les résultats contenus dans l'objet results
function gotResults(error, results) {
    if (error) {
        return;
    }
    label = results[0].label;
    consoleOutput.innerHTML = "";
    for (let i = 0; i < results.length; i++) {
        consoleOutput.insertAdjacentHTML('afterbegin', "<p>" + results[i].label + ": " + results[i].confidence * 100 + "</p><br>");
    }
    classifyVideo(); // On relance la classification
}


// On normalise les données et on entraine notre modèle
function training() {
    cnn.normalizeData();
    cnn.train({
            epochs: NbEpochs,
        },
        finishedTraining
    );
}

// On ajoute un exemple avec le label assigné
function addExample(labelValue) {
    console.log("ok")
    consoleOutput.textContent = 'Adding example: ' + labelValue;
    cnn.addData({ image: video }, { label: labelValue });
}


train.addEventListener('click', () => { training() })
class_1.addEventListener('click', () => { addExample('class_1') });
class_2.addEventListener('click', () => { addExample('class_2') });
class_3.addEventListener('click', () => { addExample('class_3') });

saveData.addEventListener('click', () => { cnn.saveData() }); // Sauvegarde des données
saveModel.addEventListener('click', () => { cnn.save() }); // Sauvegarde du modèle


// Chargement des données
loadData.addEventListener('click', () => {
    cnn.loadData('data/data.json', () => {
        console.log("data loaded");
    });
})

// Chargement du modèle
loadModel.addEventListener('click', () => {
    const modelDetails = {
        model: 'model/model.json',
        metadata: 'model/model_meta.json',
        weights: 'model/model.weights.bin'
    }
    cnn.load(modelDetails, () => { classifyVideo() }); // On lance la classification
})