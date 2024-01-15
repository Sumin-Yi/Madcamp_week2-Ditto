const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require("bcryptjs");


const jwt = require("jsonwebtoken");

const JWT_SECRET = "fsdhidsfbejbrichuishdihfjkwehihf"


const app = express();
app.use(express.json());

//connect to mongodb
const dbURI = 'mongodb+srv://suminY:sumin24@clusterditto.ensxxl4.mongodb.net/ditto';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log(err));

  require("./userDetails")

  const User = mongoose.model("UserInfo")

app.use(cors());



app.listen(80, () => {
    console.log('Server is running on port 80');
});

// const User = mongoose.model("UserInfo");
app.post("/register", async (req,res) => {
  const {username, id, password} = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10)
  try{
    const oldUser = await User.findOne({ id });
    console.log(req.body)
    if (oldUser){
      res.send({error: "User Exists"})
    }
    await User.create({
      username,
      id,
      password: encryptedPassword,
    });
    res.send({status:"ok"})
  }catch (error){
    res.send({status:"error"})
  }
})

app.post("/login-user", async (req, res) => {
  const {id, password} = req.body;
  const user = await User.findOne({id});
  if (!user) {
    return res.json({ error: "User Not Found"})
  }

  if(await bcrypt.compare(password, user.password)){
    const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET);
    if(res.status(201)){
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" })
    }
  }
  res.json({ status: "error", error: "Invalid Password" })
 });

app.post("/userData", async(req, res) => {
  const {token} = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const user_name = user.username;
    User.findOne({ username: user_name })
    .then((data) => {
      res.send({ status: "ok", data: data});
    })
    .catch((error) => {
      res.send({ status: "error", data: error})
    })
  } catch (error) {}
})

app.get('/api', (req,res) => {
  res.send({message:'hello'});
});
