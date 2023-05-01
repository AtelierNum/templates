const audioContext = new AudioContext();
const mergeNode = new GainNode(audioContext);
mergeNode.connect(audioContext.destination);

export default {
  start: (features, callback) => {
    const audios = document.querySelectorAll("audio");

    let analyzers = {};

    audios.forEach((a, i) => {
      if (!a.id) {
        a.id = "anMeyda-" + i;
      }

      const source = audioContext.createMediaElementSource(a);
      source.connect(mergeNode);

      const analyzer = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: source,
        bufferSize: 512,
        featureExtractors: features,
        callback: (features) => {
          callback(a.id, features);
        },
      });

      analyzer.start();
      analyzers[a.id];
    });

    const analyzer = Meyda.createMeydaAnalyzer({
      audioContext: audioContext,
      source: mergeNode,
      bufferSize: 512,
      featureExtractors: features,
      callback: (features) => {
        callback("all", features);
      },
    });

    analyzer.start();
    analyzers["all"];
  },
};
