//https://zellwk.com/blog/css-translate-values-in-javascript/
export function getTranslateValues(element) {
  const style = window.getComputedStyle(element);
  const matrix =
    style["transform"] || style.webkitTransform || style.mozTransform;

  // No transform property. Simply return 0 values.
  if (matrix === "none" || typeof matrix === "undefined") {
    return {
      x: 0,
      y: 0,
      z: 0,
    };
  }

  // Can either be 2d or 3d transform
  const matrixType = matrix.includes("3d") ? "3d" : "2d";
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");

  // 2d matrices have 6 values
  // Last 2 values are X and Y.
  // 2d matrices does not have Z value.
  if (matrixType === "2d") {
    return {
      x: parseFloat(matrixValues[4]),
      y: parseFloat(matrixValues[5]),
      z: 0,
    };
  }

  // 3d matrices have 16 values
  // The 13th, 14th, and 15th values are X, Y, and Z
  if (matrixType === "3d") {
    return {
      x: parseFloat(matrixValues[12]),
      y: parseFloat(matrixValues[13]),
      z: parseFloat(matrixValues[14]),
    };
  }
}

export function getBackgroundPositionValues(element) {
  const styles = window.getComputedStyle(element);
  return {
    x: parseFloat(styles.backgroundPositionX),
    y: parseFloat(styles.backgroundPositionY),
  };
}
