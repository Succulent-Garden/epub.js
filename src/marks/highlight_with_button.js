import { Mark } from "./marks"
import svg from './svg'


export class HighlightWithButton extends Mark {
  constructor(range, className, data, attributes) {
    super()
    this.range = range
    this.className = className
    this.data = data || {}
    this.attributes = attributes || {}
  }

  bind(element, container) {
    super.bind(element, container)

    for (var attr in this.data) {
      if (this.data.hasOwnProperty(attr)) {
        this.element.dataset[attr] = this.data[attr]
      }
    }

    for (var attr in this.attributes) {
      if (this.attributes.hasOwnProperty(attr)) {
        this.element.setAttribute(attr, this.attributes[attr])
      }
    }

    if (this.className) {
      this.element.classList.add(this.className)
    }
  }

  render() {
    // Empty element
    while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild)
    }

    var docFrag = this.element.ownerDocument.createDocumentFragment()
    var filtered = this.filteredRanges()
    var offset = this.element.getBoundingClientRect()
    var container = this.container.getBoundingClientRect()

    for (var i = 0, len = filtered.length; i < len; i++) {
      var r = filtered[i]
      var el = svg.createElement('rect')
      el.setAttribute('x', r.left - offset.left + container.left)
      el.setAttribute('y', r.top - offset.top + container.top)
      el.setAttribute('height', r.height)
      el.setAttribute('width', r.width)
      el.setAttribute('userData', '方框')
      docFrag.appendChild(el)

      // 添加最后的圆圈，并且添加点击事件
      if (i == len - 1) {
        const circleMark = svg.createElement('circle')
        circleMark.setAttribute('cx', r.left - offset.left + container.left + r.width)
        circleMark.setAttribute('cy', r.top - offset.top + container.top + r.height)
        circleMark.setAttribute('r', r.height * 0.5)
        circleMark.setAttribute('fill-opacity', 1)
        circleMark.setAttribute('userData', '圆圈')
        docFrag.appendChild(circleMark)
      }
    }

    this.element.appendChild(docFrag)
  }
}


export default HighlightWithButton
