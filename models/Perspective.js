const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  title: { type: String, unique: true }
}, { timestamps: true })

const Perspective = mongoose.model('Perspective', userSchema)

module.exports = Perspective
