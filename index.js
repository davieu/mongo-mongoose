const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys')
const { Schema } = mongoose;

const app = express();

//local 
// mongoose.connect('mongodb://localhost/testTUT', {useNewUrlParser: true})
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})

// async function loadCollection() {
//   const client = await mongoose.connect('mongodb+srv://davieu101:davieu101@cluster0-vgyon.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})

//   return client.db('mongo-mongoose-api').collection('people')
// }


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const UserSchema = new Schema({
  lastname: String,
  firstname: String
});

const User = mongoose.model('User', UserSchema ,'users')

// const PersonModel = mongoose.model('poop', {
//   lastname: String,
//   firstname: String
// });

app.post('/api/person', async (req, res, next) => {
  try {
    let person = new User(req.body)
    let result = await person.save();
    res.send(result);

  } catch(err) {
    res.status(500).send(err)
  }
})

// app.get('/api/people')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Listening at port: ${PORT}`));