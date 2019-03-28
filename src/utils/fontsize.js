
function updateFontSize(document, scale) {
  for (let i = 0; i < document.styleSheets.length; i++) {
    let styleSheet = document.styleSheets[i]
    for (let i = 0; i < styleSheet.rules.length; i++) { 
      let rule = styleSheet.rules[i]
      if (rule.style.fontSize.length != 0) {
        const originFontSize = rule.style.fontSize
        rule.style.fontSize = fontReSize(originFontSize, scale)
      }
    }
  }
}

function fontReSize(fontSize, scale) {
  try {
    let numberPart = fontSize.match(/\d+\.?\d*/)[0]
    let unitPart = fontSize.substring(numberPart.length)
    numberPart = Math.round(Number(numberPart) * scale)
    return `${numberPart}${unitPart}`
  } catch (error) {
    console.error('fontReSize error by: ', fontSize)
    return fontSize
  }
}

export {
  updateFontSize,
  fontReSize,
}
