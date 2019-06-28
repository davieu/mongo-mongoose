const User = require('../models/User');

module.exports = app => {
  /* HELPER FUNCTION */
  //gets all users from the DB
  const getAllUsers = async () => {
    try {
      const allUsers = await User.find().exec();
      return allUsers
    } catch(err) {
      console.error(err)
    }
  }

  /* API USERS */

  // Create user
  app.post('/api/user', async (req, res, next) => {
    try {
      let person = new User(req.body);
      let result = await person.save()
      return res.send(result);

    } catch (err) {
      let usernameNotUnique = null;

      let person = new User(req.body);
      // let allUsers = await User.find().exec();
      let allUsers = await getAllUsers();

      //looks through the DB and looks for an identical username. Then flags it.
      allUsers.forEach(t => {
        if (t.username === person.username) usernameNotUnique = true})
      // if userNameNotUnique is true then the first if block will run
      if (usernameNotUnique) {
        return res.status(400).send({
          msg:`Unable to create user. Username: ${person.username} is already in use.`,err})
      } else {
        return res.status(400).send({
          msg:'Unable to create user please check if required fields are entered.',err})
      }
    }
  })

  // Get all users
  app.get('/api/users', async (req, res, next) => {
    try {
      let result = await User.find().exec();
      res.send(result)
    } catch (err) {
      return res.status(400).send({
        msg: 'Unable to get all users',
        err}) 
    }
  })

  // Get user by ID
  // app.get('/api/user/:id', async (req, res, next) => {
  //   try {

  //   } catch (err) {
  //     res.status(400)
  //   }
  // })
}