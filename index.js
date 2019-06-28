const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys')
const { Schema } = mongoose;

const app = express();

// my local db
// mongoose.connect('mongodb://localhost/testTUT', {useNewUrlParser: true})
// connected to mongodbAtlas
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const UserSchema = new Schema({
  lastname: String,
  firstname: String
});

//mongoose.model('User', UserSchema ,'users')   the third param is what the collection is called in the DB: 'users'
const User = mongoose.model('User', UserSchema ,'users')

// const PersonModel = mongoose.model('poop', {
//   lastname: String,
//   firstname: String
// });

app.post('/api/person', async (req, res, next) => {
  try {
    let person = new User(req.body);
    let result = await person.save();
    res.send(result);

  } catch(err) {
    res.status(500).send(err);
  }
});

app.get('/api/people', async (req, res, next) => {
  try {
    let result = await User.find().exec();
    res.send(result);
  } catch(err) {
    res.status(404).send(err);
  }
});

app.get('/api/person/:id', async (req, res, next) => {
  try {
    let result = await User.findById(req.params.id).exec();
    res.send(result);
  } catch(err) {
    res.status(404).send(err);
  }
});

app.put('/api/person/:id', async (req, res, next) => {
  try {
    let person = await User.findById(req.params.id).exec();
    //anything that appears in the req.body obj replace it in the person obj that was retrieved
    person.set(req.body);
    let result = await person.save();
    res.send(result);
  } catch(err) {
    res.status(500).send(err);
  }
})

app.delete('/api/person/:id', async (req, res, next) => {
  try {
    let person = await User.findById(req.params.id).exec()
    let result = await User.deleteOne({_id: req.params.id}).exec();
    res.send({person, result});
  } catch(err) {
    res.status(500).send(err);
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Listening at port: ${PORT}`));