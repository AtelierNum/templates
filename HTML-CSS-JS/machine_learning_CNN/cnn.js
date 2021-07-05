let label = ''; // Contains the label of each class
let cnn; // Contains our model
let consoleOutput = document.getElementById('console'); // Displays information related to the model
let input = document.getElementById('video'); // Contains the video stream
let NbEpochs = 20; // Number of epochs

let class_1 = document.getElementById("class_1");
let class_2 = document.getElementById("class_2");
let class_3 = document.getElementById("class_3");
let train = document.getElementById("train");
let saveData = document.getElementById("saveData");
let loadData = document.getElementById("loadData");
let saveModel = document.getElementById("saveModel");
let loadModel = document.getElementById("loadModel");

// Configuration of our model
let options = {
    task: 'imageClassification', // Regression | classification | imageClassification, determine the task of our model
    debug: true, // Display the training interface
    inputs: [input.width, input.height, 4], // Determine the shape of our input array, 4 for 'rgba' colors
    layers: [{ // Neural network architecture
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

cnn = ml5.neuralNetwork(options); // Assigning options to our model

// Callback function after training the model
function finishedTraining() {
    consoleOutput.textContent = 'training complete';
    classifyVideo();
}

// Starts the classification which takes video as input
function classifyVideo() {
    let inputImage = {
        image: input,
    };
    cnn.classify(inputImage, gotResults);
}

// Displays the results contained in the results object
function gotResults(error, results) {
    if (error) {
        return;
    }
    label = results[0].label;
    consoleOutput.innerHTML = "";
    for (let i = 0; i < results.length; i++) {
        consoleOutput.insertAdjacentHTML('afterbegin', "<p>" + results[i].label + ": " + results[i].confidence * 100 + "</p><br>");
    }
    classifyVideo(); // We relaunch the classification
}


//We standardize the data and train our model
function training() {
    cnn.normalizeData();
    cnn.train({
            epochs: NbEpochs,
        },
        finishedTraining
    );
}

// We add an example with the assigned label
function addExample(labelValue) {
    console.log("ok")
    consoleOutput.textContent = 'Adding example: ' + labelValue;
    cnn.addData({ image: input }, { label: labelValue });
}


train.addEventListener('click', () => { training() })
class_1.addEventListener('click', () => { addExample('class_1') });
class_2.addEventListener('click', () => { addExample('class_2') });
class_3.addEventListener('click', () => { addExample('class_3') });

saveData.addEventListener('click', () => { cnn.saveData() }); // Saving data
saveModel.addEventListener('click', () => { cnn.save() }); // Saving the model


// Loading data
loadData.addEventListener('click', () => {
    cnn.loadData('data/data.json', () => {
        console.log("data loaded");
    });
})

// Loading the model
loadModel.addEventListener('click', () => {
    const modelDetails = {
        model: 'model/model.json',
        metadata: 'model/model_meta.json',
        weights: 'model/model.weights.bin'
    }
    cnn.load(modelDetails, () => { classifyVideo() }); // We launch the classification
})