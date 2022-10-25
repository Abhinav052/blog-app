const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt')
const cors = require('cors')
const port = 8000;
const host = "localhost";
const app = express();
const { UserInfo, PostInfo } = require("./mongoose");
const jwt = require('jsonwebtoken');
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json())

const invalidRefreshToken = [];

app.post('/api/auth/logout', (req, res) => {
    const refreshToken = req.body.refreshToken;
    invalidRefreshToken.push(refreshToken);
    res.status(200).send({ status: "success" })
})

const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const authToken = authHeader && authHeader.split(' ')[1]
    if (authToken == null) return res.status(403).send("token not found");
    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET_KEY, (error, payload) => {
        if (error) return res.status(403).send("invalid token");
        next()
    })
}

app.post('/api/auth/login', async (req, res) => {
    try {
        if (!(req.body.password && req.body.email)) {
            console.log("login failed form incomplete")
            return res.status(401).json({ status: "failed", info: "incomplete form" })
        }
        const userinfo = await UserInfo.findOne({ email: req.body.email.trim() });
        if (!userinfo) {
            console.log("login failed user not found")
            return res.status(402).json({ status: "failed", info: "incorrect credentials" })
        }
        else {
            console.log(userinfo);
            if (await bcrypt.compare(req.body.password.trim(), userinfo.password)) {
                console.log("login successfull")
                tokenPayload = { email: userinfo.email }
                const accessToken = createAccessToken(tokenPayload);
                console.log(accessToken)
                const refreshToken = createRefreshToken(tokenPayload);
                return res.status(200).json({ status: "success", auth: { accessToken: accessToken, refreshToken: refreshToken }, data: { role: userinfo.role, username: userinfo.username, email: userinfo.email } })
            }
            else {
                console.log("login failed password do not match")
                return res.status(403).json({ status: "failed", info: "incorrect credentials" })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({ status: "failed", error: error })
    }
})
function createAccessToken(tokenPayload) {
    return jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET_KEY)//,{ expiresIn: '20s' }
}

function createRefreshToken(tokenPayload) {
    return jwt.sign(tokenPayload, process.env.REFRESH_TOKEN_SECRET_KEY)
}
app.post('/api/auth/signup', async (req, res) => {
    try {
        if (!(req.body.password && req.body.email && req.body.username)) {
            return res.status(400).json({ status: "failed", info: "incomplete form" })
        }
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(req.body.password.trim(), salt);
        const dbresp = await UserInfo.create({ username: req.body.username, email: req.body.email.trim(), password: hashedpassword })
        console.log(req.body)
        console.log(dbresp)
        return res.status(200).send({ status: "recieved", userinfo: { email: req.body.email, name: "fakename-edit", role: "creator" } })
    }
    catch (error) {
        return res.status(400).json({ status: "failed" })
    }
})


app.post('/api/auth/refreshtoken', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.status(403).send({ status: "failed", info: "null token" });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (error, payload) => {
        if (error) return res.status(403).send({ status: "failed", info: "invalid refresh token" });
        const accessToken = createAccessToken({ email: payload.email });
        const refreshToken = createRefreshToken({ email: payload.email });
        res.status(200).json({ status: "success", authToken: { accessToken, refreshToken } });
    })
})

app.get('api/posts/gigachad', (req, res) => {
    console.log("request recieved")
    res.status(200).send("GIGACHAD Incoming get")
})



app.post('api/posts/gigachad', authentication, (req, res) => {
    console.log("request recieved")
    res.status(200).send("GIGACHAD Incoming post")
})

app.post('api/posts/create', authentication, async (req, res) => {
    const data = req.body;
    console.log(data)
    const { blog, category, email, img, status, tags, title, username } = data
    if (!status) return res.status(404).send("sign in required");
    if (!(blog && category && email && img && title && username)) return res.status(404).send("incompelete form")
    try {
        await PostInfo.create({ blog: blog, category: category, email: email, img: img, tags: [11413, "string"], title: title, username: username })
        return res.status(200).send("created success")
    }
    catch (error) {
        console.log(error)
        return res.status(404).send("create failed")
    }

})
app.listen(port, host, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`server is running on localhost 8000`)
})