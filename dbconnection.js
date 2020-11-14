const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/spaceGame", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> console.log("connected to MongoDb"));
