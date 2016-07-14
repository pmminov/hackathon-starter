const Topic = require('../models/Topic')

exports.profile = (req, res) => {
  const title = req.params.topic
  Topic.findOne({ title: title }, (err, topic) => {
    if (err) return console.log(err)
    res.render('topic', {
      title: topic.title,
      expanded: true,
      breakdown: '4/20',
      topic
    })
  })
}
