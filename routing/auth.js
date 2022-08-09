const express = require("express");
require("../db/conn");
const User = require("../db/schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello from Express Router")
});

// User Registration 

router.post("/register", async (req, res) => {

    const { email, password, contact } = req.body;

    // checking if user has filled all the required fields

    if (!email || !password || !contact) {
        return res.status(422).json({ error: "Please Enter all details" })
    }


    // checking if user has already registered

    try {
        const response = await User.findOne({ email: email });

        if (response) {
            return res.status(500).json({ error: "User Already Registred" })
        }

        // if not registered then we will create a new document and insert in document

        var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
        var url = new URL(url_string);
        var c = url.searchParams.get("d");

        if (c) {
            var userName = "Hrushikesh"
            const user = new User({ name: userName, email, password, contact });

            const userData = await user.save();

            if (userData) {
                res.status(201).json({ message: "user Registered Successfully" });
            } else {
                res.status(500).json({ error: "Error Ocurred !!" })
            }
        } else {
            const user = new User({ name: null, email, password, contact });

            const userData = await user.save();

            if (userData) {
                res.status(201).json({ message: "user Registered Successfully" });
            } else {
                res.status(500).json({ error: "Error Ocurred !!" })
            }
        }

    } catch (err) {
        console.log(err);
    }


});

// User Login

router.post("/signin", async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Plz fill the field properly" })
        }

        const userLogin = await User.findOne({ email: email })

        const userId = userLogin._id;

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwToken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
            });

            if (!isMatch) {
                return res.status(400).json({ error: "Invalid Credentials" })
            } else {
                return res.status(200).json({ error: "User SignIn Successful", _id: userId });
            }
        } else {
            return res.status(400).json({ error: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error);
    }

});



module.exports = router;