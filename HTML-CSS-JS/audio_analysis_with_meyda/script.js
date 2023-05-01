// an_meyda_wrapper is part of the template and gives you a simplistic but very easy way to get started with meyda
// if you want more you should go read the documentation of meyda, it's not very hard to use.
// https://meyda.js.org/getting-started
// https://meyda.js.org/guides/online-web-audio
import anMeyda from "/lib/an_meyda_wrapper.js";

// here you specify the features you want to extcract
// the more you specify the harder it will be for your machine, just specify what you need.
// to know which features are available, look here : https://meyda.js.org/audio-features
const features = ["rms", "spectralCentroid"];

// By default, the anMeyda we provide will listen to all the audios of the page.
// It will give back info for each audios plus info for "all" which is the audio of everything merged together
// the id will match the id of the audio it came from, unless it's "all"
anMeyda.start(features, (id, results) => {
  if (id == "all") {
    console.log(results);
  }

  if (id == "cheese") {
    console.warn(results); // I'm using warn just to get a different color;
  }
});

// play all the audios of the page when we click on the #play-all button
document.querySelector("#play-all").addEventListener("click", () => {
  document.querySelectorAll("audio").forEach((a) => a.play());
});

// stop all the audios of the page when we click on the #stop-all button
document.querySelector("#stop-all").addEventListener("click", () => {
  document.querySelectorAll("audio").forEach((a) => {
    a.pause();
    a.currentTime = 0;
  });
});
