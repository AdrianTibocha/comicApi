const mongoose = require('mongoose')

//const URI = 'mongodb://localhost:27017/comics'

const URI = 'mongodb+srv://adrian:1234@cluster0-qybhg.mongodb.net/test?retryWrites=true'


mongoose.connect(URI,{useNewUrlParser:true})
    .then(db=>console.log('DB is connected'))
    .catch(err=>console.error(err));

module.exports = mongoose;
