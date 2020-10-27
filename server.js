const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
  console.log('new connection!')
  socket.on('timesync', data => {
    socket.emit('timesync', {
      id: data && 'id' in data ? data.id : null,
      result: Date.now()
    })
  })
  socket.on('disconnect', () => {
    console.log('socket ' + socket.id + ' disconnected!')
  })
  socket.on('begin', () => {
    console.log('beginning clap!')
    io.emit('clap', Date.now() + 5000)
  })
})

http.listen(3000, () => {
  console.log("Your app is listening on port " + 3000)
})