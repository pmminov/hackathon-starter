import 'babel-polyfill'
import 'dom4'
import 'svgxuse'
import domready from 'domready'
import TopicCompact from '../topic-compact'

domready(function () {
  let topics = document.querySelectorAll('.topic-compact')
  for (let topic of topics) {
    topic.handler = new TopicCompact(topic)
    if (topic.classList.contains('increaseScore')) {
      topic.handler.increaseScore(10)
    }
  }
})
