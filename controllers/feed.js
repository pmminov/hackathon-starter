const request = require('request')
const Story = require('../models/Story')
const Topic = require('../models/Topic')

/**
 * GET /
 * Feed page.
 */
exports.index = (req, res) => {
  var topics = [ 'gay marriage', 'brexit', 'climate change', 'iphone 7', 'doping' ]
  saveTopics(topics)
  saveStories(topics)

  res.render('feed', {
    title: 'Feed'
  })

  function saveTopics (topics) {
    topics.forEach(function (topic) {
      const item = new Topic({title: topic})
      item.save()
    }, this)
  }

  function saveStories (topics) {
    // http://cdn.newsapi.com.au/content/v2/?api_key=dvae65bt88b6n8gpttv4ervt&query=description:pokemon%20AND%20description:go%20AND%20contentType:NEWS_STORY
    
    //gay marriage
    //brexit
    //climate change
    //iphone 7
    //doping
    topics.forEach(function (topic) {
      const query = {
        'query': 'description:' + topic + ' contentType:NEWS_STORY',
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
              topic: topic
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

