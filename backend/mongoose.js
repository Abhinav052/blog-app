const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/react--blog');
}
connect()
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }
    ,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "creator"
    }

})

let UserInfo = mongoose.model("UserInfo", userSchema);

console.log("Db executed")
module.exports = { UserInfo };