const { type } = require('@testing-library/user-event/dist/type');
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


const postSchema = new mongoose.Schema({
    blog: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    tags: [{ type: String }],
    title: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }

})


let UserInfo = mongoose.model("UserInfo", userSchema);
let PostInfo = mongoose.model("PostInfo", postSchema);
console.log("Db executed")
module.exports = { UserInfo, PostInfo };