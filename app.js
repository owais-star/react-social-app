const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const path = require('path')
const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
var cors = require('cors')
const { PostsModel, UsersModel } = require("./schema");



mongoose.connect("mongodb+srv://owais:dev@userdata.588jr.mongodb.net/dev", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    created_on: { type: Date, default: Date.now },
});

app.use(cors(["localhost:5000", "localhost:3000",]))
app.use(express.json())

app.use('/', express.static(path.join(__dirname, '/web/build')))





app.post('/api/v1/login',(req, res) => {
    try {
        if (!req.body.email ||
            !req.body.password
        ) {
            console.log("required field missing");
            res.status(403).send("required field missing");
            return;
        } else {

            // console.log("req.body: ", req.body);


            UsersModel.findOne({ email: req.body.email }, async (err, user) => {
                if (user) {
                   const match = await bcrypt.compare(req.body.password , user.password)
                   if(match){
                        res.status(200).send(`Login Success`)
                   }else{
                        res.status(400).send(`Entered password is incorrect`)
                   }
                } else {
                    res.status(500).send(`No user is found with this email`)
                }
                
             
        })} 
}catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }

});


app.post('/api/v1/registration', async (req, res) =>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }
        UsersModel.findOne({ email: newUser.email }, (error, user) => {
            if (user) {
                return res.status(400).send(`User already registered. `);
            }else if (error){
                return res.status(400).send(`${error.message}`);
            
            }else {
                UsersModel.create(newUser, (error, data) => {
                    if (error) {
                        throw error;
                    } else {
                        console.log(data)
                        res.send("Created your account succesfully")
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

app.put('/api/v1/profile', (req, res) => {
    res.send('profile updated')
})
app.delete('/api/v1/profile', (req, res) => {
    res.send('profile deleted')
})



mongoose.connection.on("connected", () => console.log("Database Connected..."))
mongoose.connection.on("error", (error) => console.log(`Error${error.message}`))

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})