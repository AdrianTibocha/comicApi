const mongoose = require('mongoose');
const {Schema} = mongoose;

const comicShema = new Schema({
    titulo:{type:String,required:true},
    imagen:{type:String,required:true},
    calificacion:{type:Number,required:true}
})

module.exports = mongoose.model('Comic',comicShema,'comic');