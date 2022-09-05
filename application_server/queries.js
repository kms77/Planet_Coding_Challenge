const { request, response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'explore_planets',
  password: 'password',
  keepAlive: true,
  port: 5432,
})

const getRobotsOfCrew = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('SELECT name FROM Robot WHERE "crewID" = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const getCrews = (request, response) => {
    pool.query('SELECT * FROM Crew', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
}

const getPlanets = (request, response) => {
    pool.query('SELECT * FROM Planet', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
}

const addPlanet = (request, response) => {
    const { name, visitedBy, status, description, imageURL, numberOfRobots } = request.body;
    pool.query('INSERT INTO Planet (name, visitedBy, status, description, imageURL, numberOfRobots) VALUES ($1, $2, $3, $4, $5, $6)', [name, visitedBy, status, description, imageURL, numberOfRobots], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Planet added!`);
    });
}

const updatePlanet = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, visitedBy, status, description, imageURL, numberOfRobots } = request.body;
  
    pool.query(
      'UPDATE Planet SET name = $2, visitedBy = $3, status = $4, description = $5, imageURL = $6, numberOfRobots=$7 WHERE planetID = $1',
      [id, name, visitedBy, status, description, imageURL, numberOfRobots],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`Planet modified!`);
      }
    );
}

const deletePlanet = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM Planet WHERE planetID = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Planet deleted!`);
  });
}

module.exports = {
    getCrews,
    getPlanets, 
    addPlanet,
    updatePlanet,
    deletePlanet,
    getRobotsOfCrew
}