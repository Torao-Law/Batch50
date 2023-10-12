const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send("Halo guys boleh dong pinjem seratus")
})

app.get('/janni', (req, res) => {
  res.send("Halo guys wekom to de klub")
})

app.get('/janni/:id', (req, res) => {
  const { id } = req.params

  console.log(id);
  res.send("Halo guys wekom to de klub")
})

app.get('/tajul', (req, res) => {
  res.send("Gua orang ganteng")
})

app.listen(port, () => {
  console.log("App listening on port 5000");
})