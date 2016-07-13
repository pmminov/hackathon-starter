const request = require('request')
const async = require('async')
const Story = require('../models/Story')
const Topic = require('../models/Topic')

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
    perspectives: ['Pro equality', 'Anti equality', 'Balanced', 'Other'],
    color: 'green'
  }
  var topic3 = {
    title: 'pokemon go',
    perspectives: ['Pro equality', 'Anti equality', 'Balanced', 'Other'],
    color: 'orange'
  }
  var topic4 = {
    title: 'brexit',
    perspectives: ['Pro equality', 'Anti equality', 'Balanced', 'Other'],
    color: 'yellow'
  }
  var topic5 = {
    title: 'global warming',
    perspectives: ['Pro equality', 'Anti equality', 'Balanced', 'Other'],
    color: 'blue'
  }
  var topic6 = {
    title: 'lamps',
    perspectives: ['Pro equality', 'Anti equality', 'Balanced', 'Other'],
    color: 'blue'
  }
  var topics = [ topic1, topic2, topic3, topic4, topic5, topic6 ]

  saveTopics(topics)
  saveStories(topics)

  res.render('feed', {
    title: 'Feed'
  })

  function saveTopics (topics) {
    async.eachSeries(topics, function (topic, next) {
      Topic.findOne({ title: topic.title }, (err, existingTopic) => {
        if (err) return console.log(err)
        if (existingTopic) return
        var obj = new Topic(topic)
        obj.save(next)
      })
    }, function (err) {
      if (err) return console.log(err)
    })
  }

  function saveStories (topics) {
    topics.forEach(function (topic) {
      const query = {
        'query': 'description:' + topic.title + ' contentType:NEWS_STORY',
        'api_key': process.env.NEWSCORPAU_KEY
      }
      request.get({ url: 'http://cdn.newsapi.com.au/content/v2/', qs: query }, (err, request, body) => {
        if (err) {
          return console.log(err)
        }
        const stories = JSON.parse(body).results

        stories.forEach(function (story) {
          Story.findOne({ title: story.title }, (err, existingStory) => {
            if (err) { return console.log(err) }
            if (existingStory) { return }
            const item = new Story({
              title: story.title,
              subtitle: story.subtitle,
              description: story.description,
              link: story.link,
              thumbnailImage: {
                link: story.thumbnailImage ? story.thumbnailImage.link : undefined
              },
              topic: topic.title
            })

            item.save((err) => {
              if (err) return console.log(err)
            })
          })
        }, this)
      })
    }, this)
  }
}

