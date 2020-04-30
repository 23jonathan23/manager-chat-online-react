const MessageDB = require('./config/database/databaseMessages')
const UserDB = require('./config/database/databaseUsers')

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

let messages = []
let data = []

//Função responsavel por carregar os dados do banco de dados
async function findMessages() {
  await MessageDB.find().then(res => {
    messages = []
    data = []
    let msg = res
    msg.map(msg => {
      messages.push(msg.message)
      data.push(msg)
    })
  })
}

findMessages()

app.get('/messages', async (req, res) => {
  res.send({messages, data })
})

const port = 9004

app.listen(port, () => {
  console.log(`BACKEND IS RUNNING ON PORT ${port}`)
})