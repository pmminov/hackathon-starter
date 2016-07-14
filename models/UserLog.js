const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const userSchema = new mongoose.Schema({
  newsRead: { type: [String] },
  topicScores: { type: [String] },
  user: { type: ObjectId, ref: 'User' }
}, { timestamps: true })

const UserLog = mongoose.model('UserLog', userSchema)

module.exports = UserLog
