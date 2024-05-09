const express = require('express')
const app = express()

const notes = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Welcome to Phonebook Backend</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(notes)
})

app.get('/info', (request, response) => {

  const time = new Date()

  response.send(`
    <p>Phonebook has info for ${notes.length} people</p>
    <p>${time}</p>
  `)
})

const port = 3000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})


