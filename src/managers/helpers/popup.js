import { Mark } from "marks-pane"


export class Popup extends Mark {
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
        el.setAttribute('y', r.top - offset.top + container.top - 20)
        el.setAttribute('height', r.height)
        el.setAttribute('width', r.width)
        el.setAttribute('rx', r.width)
        el.setAttribute('ry', r.width)
        docFrag.appendChild(el)
    }

    this.element.appendChild(docFrag)
  }
}

class svg {
  static createElement(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
  }
}

export default Popup
