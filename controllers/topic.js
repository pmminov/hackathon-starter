/**
 * GET /
 * Feed page.
 */
exports.index = (req, res) => {
  res.render('topic', {
    title: 'Topic'
  })
}
