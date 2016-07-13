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
    res.render('topic', {
      title: 'Topic',
      stories
    })
  })
}
