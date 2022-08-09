const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: String,
    email : String,
    password: String,
    contact: Number,
    tokens: [
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
});

// Hashing our passwords
userSchema.pre("save", async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// generating jwt token

userSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);

        // below line adds the token in db
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(e){
        console.log(e);
    }
}

const User = new mongoose.model("USER", userSchema);

module.exports = User;

// return res
// .status(401)
// .json({ message: "Some error occurred while adding projects! 🔴 " });