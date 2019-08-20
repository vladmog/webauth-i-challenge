const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const db = require('./api-model');



    // POST	/api/register

    // Creates a user using the information sent inside the body of the request. Hash the password before saving the user to the database.

    router.post('/register', (req, res) => {
        const credentials = req.body;
        const hash = bcrypt.hashSync(credentials.password, 14);
        credentials.password = hash;

        db.add(credentials)
            .then((response) => {
                res.status(200).json(response)
            })
            .catch((err) => {
                console.log("ERR", err)
                res.status(500).json(err)
            })
    })
    
    // POST	/api/login

    // Use the credentials sent inside the body to authenticate the user. On successful login, create a new session for the user 
    // and send back a 'Logged in' message and a cookie that contains the user id. If login fails, respond with the correct status code 
    // and the message: 'You shall not pass!'

    router.post('/login', (req, res) => {
        const credentials = req.body;
        db.findByUsername(credentials.username)
            .then((user) => {
                if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
                    return res.status(401).json({ error: 'You shall not pass!' });
                } else {
                    return res.status(200).json(user)
                }
            })
            .catch(() => {
                res.status(500).json({ message: doh })
            })
        
    })
    
    
    // GET	/api/users
    
    // If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the 
    // correct status code and the message: 'You shall not pass!'.
    
    router.get('/users', (req, res) => {
        db.find()
            .then((response) => {
                res.status(200).json(response)
            })
            .catch(() => {
    
            })
    })

module.exports = router;