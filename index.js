const express = require('express')
const bodyParser = require('body-parser')
const { ClassRoom, Student } = require('./models')

const app = express()
const jsonParser = bodyParser.json()

app.use('/css', express.static(__dirname+'/css'))
app.use('/js', express.static(__dirname+'/js'))
app.set('view engine', 'ejs')

// HTML Route
app.get('/dashboard', async (req,res)=>{
  let classRoom = await fetch('http://localhost:7000/class-room')
  let data = await classRoom.json()
  res.render('dashboard', { classRooms: data })
})

app.get('/dashboard/:class_room_id', async (req,res) =>{
  let students = await fetch(`http://localhost:7000/class-room/${req.params.class_room_id}/student`)
  let data = await students.json()
  res.render('students', { students: data.Students, className: data.name, classId: data.id })
})

// CREATE
app.post('/class-room', jsonParser, async (req, res) => {
  const data = await ClassRoom.create({
    name: req.body.name
  })
  res.status(201).send(data)
})

app.post('/student', jsonParser, async (req, res) => {
  const data = await Student.create({
    name: req.body.name,
    score: req.body.score,
    ClassRoomId: req.body.ClassRoomId
  })
  res.status(201).send(data)
})

// READ
app.get('/class-room', async(req,res) => {
  const data = await ClassRoom.findAll()
  res.send(data)
})

app.get('/class-room/:id/student', async(req, res) => {
  const data = await ClassRoom.findByPk(req.params.id, {
      include: Student
    })
    res.send(data)
})

app.listen(7000, () => {
  console.log("Running at localhost:7000")
})

