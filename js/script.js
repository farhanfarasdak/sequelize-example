const handleInputClassRoom = async () => {
  let inputClass = document.getElementById("inputClass")
  console.log(inputClass.value)
  const resp = await fetch('http://localhost:7000/class-room', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: inputClass.value })
  })
  location.reload()
}

const handleInputStudent = async (class_room_id) => {
  let inputStudent = document.getElementById("inputStudent")
  const resp = await fetch(`http://localhost:7000/student`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      name: inputStudent.value,
      ClassRoomId: class_room_id
     })
  })
  location.reload()
}