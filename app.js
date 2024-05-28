const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
var cors = require("cors");

const sequelize = require('./util/database.js');
const User = require('./model/User.js');


const app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//middleware to handle the get request on "/" - retrieves the data from database and sends it to the frontend
app.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll();
        //console.log(JSON.stringify(users, null, 2));
        res.status(200).json({ allUsers: users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
    }
});

//middleware to handle the post request on "/" - creates a new user and sends it to the database as well to the frontend 
app.post('/', async (req, res, next) => {

    try {
        const { userName, emailId, phoneNumber } = req.body;
        const data = await User.create({
            userName: userName,
            emailId: emailId,
            phoneNumber: phoneNumber
        });
        res.status(201).json({ newUserData: data });

    } catch (error) {
        console.log(error);
    }
});

//middleware to handle the delete request when clicked on the delete button in frontend
app.delete('/:id', async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await User.destroy({ where: { id: userId } });
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ error: "User not found" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
    }
});

//middleware to handle the edit request when clicked on the edit button in frontend
app.put('/:id', async (req, res, next) => {
    const userId = req.params.id;
    const {userName, emailId, phoneNumber} = req.body;
    try {
        const user = await User.findByPk(userId);
        if(user){
            user.userName = userName;
            user.emailId = emailId;
            user.phoneNumber = phoneNumber;
            await user.save();
            res.status(200).json({updatedUserData: user});
        } else {
            res.status(404).json({error: "User Not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Some error occurred"});
    }
});

sequelize.sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));