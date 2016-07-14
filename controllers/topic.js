const Story = require('../models/Story')

exports.profile = (req, res) => {
  const topic = req.params.topic.toLowerCase()
  Story.find({ topic: topic }, (err, stories) => {
    if (err) return console.log(err)
    res.render('topic', {
      title: topic,
      expanded: true,
      breakdown: '4/20',
      topic
    })
  })
}
