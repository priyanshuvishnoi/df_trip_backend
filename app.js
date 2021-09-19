const express = require('express');

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.put('/',(req, res) => {
  res.json({req: req.body})
})

app.listen(3000)