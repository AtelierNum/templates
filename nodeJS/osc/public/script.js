const dashboard = document.getElementById('dashboard');
const socket = io();

let gestures = []
let detectedGesture = '';

socket.on('gestures-values', ({data}) => {
    console.log('gesture values', data)
    if (gestures.length == 0){
        gestures = data.filter(x => typeof x == 'number')
        console.log(gestures)

        createDashboard();
    }

})

socket.on('gesture-detected', ({data}) => {
    detectedGesture = data;
    console.log('detected gesture' ,detectedGesture)

    turnOn();
})


const createDashboard = () => {
    let i = 1;
    for (let gesture of gestures){
        let el = document.createElement('div');
        el.classList.add('gesture');
        el.innerHTML = `
            <h2>Gesture ${i}</h2>
            <div class="pin"></div>
        `;

        dashboard.appendChild(el);
        i ++;
    }
}

const turnOn = () => {
    const i = detectedGesture.split('/output_')[1];
    const gestureDom = dashboard.children[i];

    Array.from(dashboard.children).forEach(child => {
        child.classList.remove('active');
    })

    gestureDom.classList.add('active');
}