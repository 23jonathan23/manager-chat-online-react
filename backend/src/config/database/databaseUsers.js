const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/userconsutor', {useNewUrlParser: true, useUnifiedTopology: true})

let userDataSchema = new mongoose.Schema({ 
  username: {type: String, require: true},
  password: {type: String, required: true},
  createdAt: { type: Date, default: Date.now }
 }, {collection: 'userconsultor'})

let UserDB = mongoose.model('UserConsultor', userDataSchema);

module.exports = UserDB