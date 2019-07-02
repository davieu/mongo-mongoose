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
    let createdUser = new User(req.body);
    try {
      let result = await createdUser.save()
      return res.send(result);

    } catch (err) {
      let usernameNotUnique = null;
      let allUsers = await getAllUsers();
      //looks through the DB and looks for an identical username. Then flags it.
      allUsers.forEach(dbUser => {
        if (dbUser.username === createdUser.username) usernameNotUnique = true})
      // if userNameNotUnique is true then the first if block will run
      if (usernameNotUnique) {
        return res.status(400).send({
          msg:`Unable to create user. Username: ${createdUser.username} is already in use.`,err})
      } else {
        return res.status(400).send({
          msg:'Unable to create user please check if required fields are entered.',err})
      }
    }
  });

  // Get all users
  app.get('/api/users', async (req, res, next) => {
    try {
      let result = await User.find().exec();
      res.send(result)
    } catch (err) {
      return res.status(404).send({
        msg: 'Unable to get all users',
        err
      }) 
    }
  });

  // Get user by ID
  app.get('/api/user/:id', async (req, res, next) => {
    try {
      let result = await User.findById(req.params.id).exec()
      res.send(result)
    } catch (err) {
      res.status(404).send({
        msg: 'User not found',
        err
      })
    }
  });

  // Update user by ID
  app.put('/api/user/:id', async (req, res, next) => {
    try {
      let person = await User.findById(req.params.id).exec();
      //anything that appears in the req.body obj replace it in the person obj that was retrieved
      person.set(req.body);
      let result = await person.save();
      res.send({
        result
      });
    } catch(err) {
      res.status(404).send({
        msg: 'Unable to update your account please try again.',
        err
      });
    }
  })

  // Delete user by ID
  app.delete('/api/user/:id', async (req, res, next) => {
    try {
      let userDeleted = await User.findById(req.params.id).exec();
      let result = await User.deleteOne({_id: req.params.id}).exec();
      res.send({userDeleted, result})
    } catch (err) {
      res.status(404).send({
        msg: 'User not found',
        err
      })
    }
  })
}