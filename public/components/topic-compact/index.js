export default class TopicCompact {
  constructor (element) {
    this.element = element
    this.progress = this.element.querySelector('span.progress')
    this.marker = this.element.querySelector('span.marker')
    this.score = 100 - parseInt(this.progress.style.getPropertyValue('right'))
    console.log(this.element)
  }

  increaseScore (inc) {
    this.marker.classList.add('show')
    setTimeout(() => {
      this.progress.style.right = bound(100 - (this.score + inc), 0, 100) + '%'
    }, 2000)
  }
}

function bound (_number, _min, _max) {
  return Math.max(Math.min(_number, _max), _min)
}
