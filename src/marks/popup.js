import { Mark } from "./marks";
import svg from "./svg";

export class Popup extends Mark {
  constructor(range, className, data, attributes) {
    super();
    this.range = range;
    this.className = className;
    this.data = data || {};
    this.attributes = attributes || {};
  }

  bind(element, container) {
    super.bind(element, container);

    for (var attr in this.data) {
      if (this.data.hasOwnProperty(attr)) {
        this.element.dataset[attr] = this.data[attr];
      }
    }

    for (var attr in this.attributes) {
      if (this.attributes.hasOwnProperty(attr)) {
        this.element.setAttribute(attr, this.attributes[attr]);
      }
    }

    if (this.className) {
      this.element.classList.add(this.className);
    }
  }

  render() {
    // Empty element
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }

    // 创建DOM
    var docFrag = this.element.ownerDocument.createDocumentFragment();
    var filtered = this.filteredRanges();
    var offset = this.element.getBoundingClientRect();
    var container = this.container.getBoundingClientRect();

    // 准备文字
    const texts = this.getTexts(this.data.texts.join('|'))

    // 定位到圆圈
    const textHeight = texts.length * 20
    const r = filtered[filtered.length - 1];
    const hPadding = 24
    const vPadding = 14
    const singleLineTextHeight = 24
    const containerWidth = hPadding * 2 + 238
    const containerHeight = textHeight + vPadding * 2

    const containerX = r.left - offset.left + container.left + r.width - containerWidth * 0.5
    const containerY = r.top - offset.top + container.top - containerHeight

    // 画泡泡
    const cr = 5
    const cx = r.left - offset.left + container.left + r.width
    const cy = r.top - offset.top + container.top + cr
    const backgroundContainer = svg.createElement('path')
    const hW = containerWidth * 0.5
    const xOfst = this._calculatePopupOffset(cx, hW)

    const pathD = `M${cx},${cy} ` +
    `L${cx-cr},${cy-cr} ` +
    `L${cx-hW+cr+xOfst},${cy-cr} ` + 
    `S${cx-hW+xOfst},${cy-cr},${cx-hW+xOfst},${cy-cr*2} ` + 
    `L${cx-hW+xOfst},${cy-containerHeight} ` +
    `S${cx-hW+xOfst},${cy-containerHeight-cr},${cx-hW+cr+xOfst},${cy-containerHeight-cr} ` +
    `L${cx+hW-cr+xOfst},${cy-containerHeight-cr} ` +
    `S${cx+hW+xOfst},${cy-containerHeight-cr},${cx+hW+xOfst},${cy-containerHeight} ` +
    `L${cx+hW+xOfst},${cy-cr*2} ` +
    `S${cx+hW+xOfst},${cy-cr},${cx+hW-cr+xOfst},${cy-cr} ` +
    `L${cx+cr},${cy-cr} ` +
    `Z`

    svg.setAttributes(backgroundContainer, {
      'd': pathD,
      'fill': 'yellow',
      'stroke': 'blue',
      'stroke-width': 1,
      'font-size': 24,
    })

    // 添加文字容器
    const textElement = svg.createElement('text')
    svg.setAttributes(textElement, {
      'x': containerX + hPadding + xOfst,
      'y': containerY + vPadding * 2.2,
      'font': '13pt sans-serif',
      'fill': 'black',
      'fill-opacity': 1,
      'mix-blend-mode': 'normal',
      'userData': 'textArea',
    })
    // 填写文字
    for (let i = texts.length - 1; i >= 0; i--) {
      const tspan = svg.createElement('tspan')
      svg.setAttributes(tspan, {
        'x': containerX + hPadding + xOfst,
        'y': containerY + vPadding * 2.2 + 20 * i
      })
      tspan.innerHTML = texts[i]
      textElement.appendChild(tspan)
    }

    // textElement.innerHTML = this.data.texts.join('|')

    console.log('getTexts: ', this.getTexts(textElement.innerHTML))

    docFrag.appendChild(backgroundContainer)
    docFrag.appendChild(textElement)

    this.element.appendChild(docFrag);
  }

  _calculatePopupOffset(cx, halfWidth) {
    const containerWidth = window.innerWidth
    const leftX = cx - halfWidth
    const rightX = cx + halfWidth
    if (leftX <= 0) {
      return 0 - leftX + 10
    }
    if (rightX > containerWidth) {
      return containerWidth - rightX - 20
    }
    return 0
  }

  getTexts(text) {
    let texts = []
    let startIndex = 0

    let i = 0
    while (i < text.length) {
      const s = text.substring(startIndex, i)
      if (svg.getTextWidth(s, '13pt sans-serif') > 245) {
        texts.push(text.substring(startIndex, i - 1))
        startIndex = i - 1
        i = i - 1
        continue
      }

      i = i + 1
    }
    texts.push(text.substring(startIndex, text.length))

    return texts
  }

}

export default Popup;
