const express = require("express")
const mongoose = require("mongoose")
const User = require("./models/User")
const cors = require("cors")




const app = express()
app.use(cors())
app.use(express.json())
const port = 5000
const uri = "mongodb+srv://blog:12345blog@cluster1.nexbokg.mongodb.net/blog?retryWrites=true&w=majority"


mongoose.connect(uri).then(() => {
    console.log("Connected to database successfully")
}).catch(e =>{
    console.log(e)
    console.log("Failed to conenct to db")
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.get("/", (req, res) => {
    return res.send("Hello world")
})

app.post("/register", async (req, res) => {
    console.log(req.body)
    const {email, name, password} = req.body
    try {
        const savedUser = await User.create({email, name, password})
        return res.status(400).json({message: "registered successfully"})
    } catch (error) {
        console.log({error})
        return res.status(500).json({message: "registration failed"})     
    }
})

app.post("/login", async (req, res) => {
    console.log(req.body)
    const {email, password} = req.body
    try {
        const user = await User.findOne({email, password})
        if(!user) return res.status(400).json({message: "user with this account details dosent match", success: false})
        else return res.status(200).json({message: "Login successfull", result: user, success: true})
    } catch (error) {
        console.log({error})
        return res.status(500).json({result: user, success: true})     
    }
})






