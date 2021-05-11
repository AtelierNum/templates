let db; // this will be our database obbject


function setup() {
  /*
  The example here does register all the information needed to connect to a database (with api key etc), 
  this is for the sake of showing what it looks like and 
  having an example that works right out of the box 
  But don't publish your credentials and api keys !
  */
  var firebaseConfig = {
    apiKey: "AIzaSyCmzKLYROqpkua4-ibqbsrUsIgIYukUzH4",
    authDomain: "test-a1b52.firebaseapp.com",
    databaseURL: "https://test-a1b52.firebaseio.com",
    projectId: "test-a1b52",
    storageBucket: "test-a1b52.appspot.com",
    messagingSenderId: "761726826245",
    appId: "1:761726826245:web:9cf6c2d1b3aea915e9a96c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  db = firebase.database();

  createCanvas(windowWidth, windowHeight)
  background(255, 180, 180)

  createForm()

}

function draw() {
  // background(255, 180, 180)

}

function createForm() {
  textAlign(LEFT, CENTER)
  textSize(24)
  fill(0)

  text("What is you name ?", width * 0.05, height * 0.05)
  let inp1 = createInput('');
  inp1.position(width * 0.05, height * 0.1);
  inp1.size(width * 0.2);
  inp1.input(function () {
    console.log(inp1.value())
  });

  text("What is your quest ?", width * 0.05, height * 0.25)
  let inp2 = createInput('');
  inp2.position(width * 0.05, height * 0.3);
  inp2.size(width * 0.2);
  inp2.input(function () {
    console.log(inp2.value())
  });

  text("What is the airspeed velocity of an unladen swallow ?", width * 0.05, height * 0.45)
  let sel = createSelect();
  sel.position(width * 0.05, height * 0.5);
  sel.size(width * 0.2);
  sel.option('What kind of swallow ? African or European ?');
  sel.option("I don't know");
  sel.option('11 meters per second');
  sel.option('24 miles per hour');
  textAlign(CENTER);
  sel.input(function () {
    console.log(sel.value())
  });

  let butt1 = createButton('Send my answers');
  butt1.size(width * 0.1)
  butt1.position(width * 0.05, height * 0.7);
  butt1.mousePressed(function () {
    // get all the data from elements
    let data = {
      name: inp1.value(),
      quest: inp2.value(),
      trickQuestion: sel.value()
    }
    db.ref('answers').push(data, pushData) // do send it to the database
  })

  let butt2 = createButton('Get all the answers in the db');
  butt2.size(width * 0.1)
  butt2.position(width * 0.05, height * 0.85);
  butt2.mousePressed(function () {
    db.ref('answers').on("value", gotData, errorData)
  })

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  removeElements();
  background(255, 180, 180)
  createForm()
}



function pushData(error) {
  if (error) {
    console.log('ooops');
  } else {
    console.log('data saved!');
  }
}


function gotData(data) {
  console.log(data.val())
  // Grab the keys to iterate over the object
  var keys = Object.keys(data.val());

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    console.log(i, data.val()[key])
  }
}

function errorData(error) {
  if (error) {
    console.log('error rerteiving data');
  }

}