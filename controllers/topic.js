const request = require('request')
const Story = require('../models/Story')
const Topic = require('../models/Topic')

/**
 * GET /
 * Feed page.
 */
exports.index = (req, res) => {
  Story.find({ topic: 'gay marriage' }, (err, stories) => {
    if (err) return console.log(err)
    const cards = []
    stories.forEach(function (story) {
      var card = {
        title: story.title,
        text: story.description
      }
      cards.push(card)
    }, this)
    res.render('topic', {
      title: 'Topic',
      cards
    })
  })
}

exports.topic = (req, res) => {
  const topic = req.params.topic.toLowerCase()
  Story.find({ topic: topic }, (err, stories) => {
    if (err) return console.log(err)
    const cards = []
    stories.forEach(function (story) {
      var card = {
        colour: topic.color,
        title: story.title,
        text: story.description,
        src: story.thumbnailImage.link,
        href: story.link,
        perspective: {
          name: story.perspective,
          score: '4/20'
        }
      }
      cards.push(card)
    }, this)
    res.render('topic', {
      title: topic.title,
      topic,
      cards
    })
  })
}

exports.profile = (req, res) => {
  const topic = req.params.topic.toLowerCase()
  Story.find({ topic: topic }, (err, stories) => {
    if (err) return console.log(err)
    res.render('topicProfile', {
      title: topic,
      expanded: true,
      breakdown: '4/20',
      topic
    })
  })
}
