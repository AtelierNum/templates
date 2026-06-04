const vertShader = `
precision highp float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  vTexCoord = aTexCoord;
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}
`;

const fragShader = `
precision highp float;
varying vec2 vTexCoord;

uniform sampler2D tex0;
uniform vec3 keyColor;
uniform float threshold;
uniform float smoothness;

void main() {
  vec2 uv = vTexCoord;
  
  vec4 color = texture2D(tex0, uv);
  float diff = distance(color.rgb, keyColor);
  float alpha = smoothstep(threshold, threshold + smoothness, diff);
  
  float finalAlpha = color.a * alpha;
  
  // Premultiplied alpha output
  gl_FragColor = vec4(color.rgb * finalAlpha, finalAlpha);
}
`;

let chromakeyShader;

let videosPaths = ["assets/xp.mp4", "assets/woah.mp4"];
let videos = null;

function setup() {
  createCanvas(600, 400, WEBGL);

  chromakeyShader = createShader(vertShader, fragShader);

  // instantiation of every video
  videos = videosPaths.map((path) => {
    const vidRef = createVideo(path);
    vidRef.hide(); // hide the <video> html element from the page
    vidRef.volume(0); // muting the video is mandatory to autoplay
    vidRef.loop(); // play the vid on repeat

    return vidRef;
  });
}

function draw() {
  background(0);

  // OPTIONNAL : brings back the coordinate (0,0) at the top left, as usual for P2D
  translate(-width / 2, -height / 2);

  // put a cyan grid over the background to test the chroma key effect
  // you can replace all of this with the graphics you want UNDER the video
  push();
  stroke(0, 150, 255);
  strokeWeight(2);
  for (let i = 0; i <= 600; i += 40) {
    line(i, 0, i, 400);
  }
  for (let j = 0; j <= 400; j += 40) {
    line(0, j, 600, j);
  }

  fill(0, 255, 0);
  circle(0, 0, 200);
  pop();

  // replace these by the fixed values once you know what you need
  let threshold = map(mouseX, 0, width, 0.1, 0.8, true);
  let smoothness = map(mouseY, 0, height, 0.01, 0.3, true);

  // enables the shader, which means the filling of the shape will use the output of the shader
  shader(chromakeyShader);

  // color to key out (pure green: R=0.0, G=1.0, B=0.0)
  // You may need to tweak this RGB array depending on the specific shade of green in your video
  chromakeyShader.setUniform("keyColor", [0.0, 1.0, 0.0]);
  chromakeyShader.setUniform("threshold", threshold);
  chromakeyShader.setUniform("smoothness", smoothness);

  videos.forEach((v) => {
    // give the frame of the video to the shader
    chromakeyShader.setUniform("tex0", v);

    // use the output state to fill-in a rect covering the whole canvas
    rect(0, 0, width, height);
  });

  // disables the shader, from there we're back to regular p5
  resetShader();

  // everything you draw from here will be ONTOP of keyed content
  push();
  fill(0, 255, 0);
  circle(width, height, 200);
  pop();
}
