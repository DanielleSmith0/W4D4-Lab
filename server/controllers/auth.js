const bcrypt = require("bcryptjs");
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
console.log(users);
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        console.log(users[i]);
        console.log(req.body);
        if (users[i].username === username) {
          const existingPass = bcrypt.compareSync(password, users[i].passwordHash)
          console.log(existingPass)
          if(existingPass) {
            let infoToReturn = {...users[i]};
            delete infoToReturn.passwordHash
            return res.status(200).send(infoToReturn);
          }else{
            console.log("bad password")
            return res.status(400).send("bad password");
          }
        }
      }
      console.log("user not found")
      res.status(400).send("User not found.");
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        const {
          username,
          email,
          firstName,
          lastName,
          password
        } = req.body
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password, salt)
        let userInfo = {
          username,
          email,
          firstName,
          lastName,
          passwordHash
        }
        users.push(userInfo)
        res.status(200).send({
          username, email, firstName, lastName
        });
    }
}