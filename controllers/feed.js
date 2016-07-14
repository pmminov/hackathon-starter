const async = require('async')
const Story = require('../models/Story')
const Topic = require('../models/Topic')

exports.topic = (req, res) => {
  async.waterfall([
    function (callback) {
      Topic.findOne({ title: req.params.topic }, (err, topic) => {
        if (err) return callback(err)
        callback(null, topic)
      })
    },
    function (topic, callback) {
      Story.find({ topic: topic.title }, (err, stories) => {
        if (err) return callback(err)
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
        callback(null, topic, cards)
      })
    }
  ], function (err, topic, cards) {
    if (err) console.log(err)
    res.render('feed', {
      title: topic.title,
      topic: topic,
      cards: cards
    })
  })
}
