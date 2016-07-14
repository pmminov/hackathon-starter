const Story = require('../models/Story')

exports.index = (req, res) => {
  const topic = req.params.article.toLowerCase()
  Story.find({ topic: topic }, (err, stories) => {
    if (err) return console.log(err)
    res.render('article', {
      title: topic,
      expanded: true,
      url: 'http://www.mybigidea.org.au/',
      topic
    })
  })
}
