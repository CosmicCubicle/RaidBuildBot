const mongoose = require('mongoose')

const dataBadWord = new mongoose.Schema({
    word: mongoose.SchemaTypes.String,
    discordId : mongoose.SchemaTypes.String, 
});

module.exports = mongoose.model('BadWord', dataBadWord);