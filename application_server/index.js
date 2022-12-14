const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors');

const app = express()
const port = 3000
const db = require('./queries')

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

app.get('/crews', db.getCrews)
app.get('/planets', db.getPlanets)
app.post('/planets', db.addPlanet)
app.put('/planets/:id', db.updatePlanet)
app.delete('/planets/:id', db.deletePlanet)