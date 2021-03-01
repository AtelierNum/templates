const fs = require('fs');
const express = require("express");
const app = express();
const http = require("http").createServer(app)
const {join} = require("path");

app.use(express.static(join(__dirname,'showcase')));
app.use('/node_modules', express.static(join(__dirname,'node_modules')));
app.use('/sketches', express.static(join(__dirname,'sketches')));

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

fs.readFile('./showcase/index.html', 'utf8', (err, data) => {
    const gridTag = '<ul id="my-sketches">';
    const part1 = data.slice(0, data.indexOf(gridTag) + gridTag.length);
    const part2 = data.slice(data.indexOf('</ul>'));
    
    let sketchesTags = '';

    for (let sketch in mySketches){
        sketchesTags += `<li>
                <iframe id="${sketch.split(' ').join('')}" src="${mySketches[sketch].find(file => file.includes('.html'))}" frameborder="0"></iframe>
            </li>   
        `;
    }

    fs.writeFile('showcase/index.html', part1 + '\n' + sketchesTags + part2, function (err) {
        if (err) return console.warn(err);
        console.log('Sketches html created.')

        const port = 3002;
        http.listen(port, () => {
            console.log("App started on http://localhost:" + port);
        });
    })
});



