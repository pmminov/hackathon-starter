/**
 * GET /
 * Feed page.
 */
exports.index = (req, res) => {
  res.render('topic', {
    title: 'Topic'
  })
}

exports.topic = (req, res) => {
  res.render('topic', {
    title: req.params.name
  })
}
