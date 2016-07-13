const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  perspectives: { type: [String] },
  color: { type: String }
}, { timestamps: true })

const Topic = mongoose.model('Topic', userSchema)

module.exports = Topic
