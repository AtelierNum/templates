const fs = require('fs');
let sketches = {};

const getSketches = (dir) => {
    fs.readdirSync(dir).forEach(function(path) {
        const file = dir + '/' + path;
        let stat = fs.statSync(file);
    
        if (stat && stat.isDirectory()) {
            getSketches(file);
        } else if (stat && stat.isFile()){
            let sketchName = dir.split('/')[dir.split('/').length -1];
            if (sketches[sketchName]){
                sketches[sketchName].push(file);
            } else {
                sketches[sketchName] = [file];
            }
        }
    });

    return sketches;
}

const mySketches = getSketches('./sketches')

fs.writeFile('showcase/sketches.json', JSON.stringify(mySketches), function (err) {
    if (err) return console.warn(err);
    console.log('Sketches json created.')
})
