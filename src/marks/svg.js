export function createElement(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function setAttributes(element, attributes) {
  for (const k in attributes) {
    element.setAttribute(k, attributes[k])
  }
}

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 * 
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 * 
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font) {
  // re-use canvas object for better performance
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}

export default {
  createElement: createElement,
  setAttributes: setAttributes,
  getTextWidth: getTextWidth,
};