const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const userSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  subtitle: { type: String },
  description: { type: String },
  body: { type: String },
  link: { type: String },
  thumbnailImage: {
    link: { type: String }
  },
  topic: { type: String },
  color: { type: String },
  perspective: { type: String }
}, { timestamps: true })

const Story = mongoose.model('Story', userSchema)

module.exports = Story
