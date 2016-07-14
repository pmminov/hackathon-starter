const request = require('request')
const async = require('async')
const Story = require('../models/Story')
const Topic = require('../models/Topic')
const UserLog = require('../models/UserLog')

/**
 * GET /
 * Feed page.
 */
exports.index = (req, res) => {

  var topic1 = {
    title: 'gay marriage',
    perspectives: ['Pro equality', 'Anti equality', 'Balanced', 'Other'],
    color: 'blue'
  }
  var topic2 = {
    title: 'doping',
    perspectives: ['One', 'Two', 'Three', 'Other'],
    color: 'green'
  }
  var topic3 = {
    title: 'pokemon go',
    perspectives: ['Four', 'Five', 'Six', 'Other'],
    color: 'orange'
  }
  var topic4 = {
    title: 'brexit',
    perspectives: ['Seven', 'Eight', 'Nine', 'Other'],
    color: 'yellow'
  }
  var topic5 = {
    title: 'global warming',
    perspectives: ['Ten', 'Eleven', 'Twelve', 'Other'],
    color: 'blue'
  }
  var topic6 = {
    title: 'lamps',
    perspectives: ['Pro equality', 'Anti equality', 'Balanced', 'Other'],
    color: 'blue'
  }
  var topics = [ topic1, topic2, topic3, topic4, topic5, topic6 ]

  async.series([
    function (callback) {
      UserLog.findOne({ user: req.user }, (err, userLog) => {
        if (err) return callback(err)
        callback(null, userLog)
      })
    },
    function (callback) {
      async.eachSeries(topics, function (topic, next) {
        Topic.findOne({ title: topic.title }, (err, existingTopic) => {
          if (err) return callback(err)
          if (existingTopic) return next()
          var obj = new Topic(topic)
          obj.save(next)
        })
      }, function (err) {
        if (err) return callback(err)
        callback(null)
      })
    },
    function (callback) {
      async.eachSeries(topics, function (topic, next) {
        const query = {
          'query': 'description:' + topic.title + ' contentType:NEWS_STORY',
          'api_key': process.env.NEWSCORPAU_KEY
        }
        request.get({ url: 'http://cdn.newsapi.com.au/content/v2/', qs: query }, (err, request, body) => {
          if (err) {
            return callback(err)
          }
          const stories = JSON.parse(body).results
          async.eachSeries(stories, function (story, next) {
            Story.findOne({ title: story.title }, (err, existingStory) => {
              if (err) { return callback(err) }
              if (existingStory) { return next() }
              const item = new Story({
                title: story.title,
                subtitle: story.subtitle,
                description: story.description,
                link: story.link,
                thumbnailImage: {
                  link: story.thumbnailImage ? story.thumbnailImage.link : undefined
                },
                topic: topic.title,
                color: topic.color,
                perspective: topic.perspectives[Math.floor(Math.random() * topic.perspectives.length)]
              })
              item.save(next)
            })
          }, function (err) {
            if (err) return callback(err)
            return next()
          })
        })
      }, function (err) {
        if (err) return callback(err)
        callback(null)
      })
    }
  ],
  function (err, results) {
    if (err) console.log(err)

    res.render('feed', {
      title: 'Feed',
      topics: topics
    })
  })
}
