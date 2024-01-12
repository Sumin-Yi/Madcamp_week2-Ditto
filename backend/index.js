const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


app.listen(80, () => {
    console.log('Server is running on port 80');
});

app.get('/api', (req,res) => {
  res.send({message:'hello'});
});