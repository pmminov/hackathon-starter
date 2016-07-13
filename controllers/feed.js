/**
 * GET /
 * Feed page.
 */
exports.index = (req, res) => {
  res.render('feed', {
    title: 'Feed'
  })
}
