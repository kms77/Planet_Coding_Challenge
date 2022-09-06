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


const getCrews = (request, response) => {
  pool.query('select c."crewID", c.captain, c.shuttle, c.name, string_agg(r.name,\',\') as "robots" from crew c JOIN robot r on c."crewID" = r."crewID" group by c."crewID" order by c."crewID";', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const getPlanets = (request, response) => {
  pool.query('select p."planetID", p.name, p."visitedBy", p.status, p.description, p."imageURL", p."numberOfRobots", c."crewID", c.captain ,string_agg(r.name,\',\') as "robots" from planet p join crew c on p."visitedBy"=c."crewID" JOIN robot r on c."crewID" = r."crewID" group by p."planetID", c."crewID" order by p."planetID", c."crewID";', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const addPlanet = (request, response) => {
    const { name, visitedBy, status, description, imageURL, numberOfRobots } = request.body;
    pool.query('INSERT INTO Planet (name, "visitedBy", status, description, "imageURL", "numberOfRobots") VALUES ($1, $2, $3, $4, $5, $6)', [name, visitedBy, status, description, imageURL, numberOfRobots], (error, results) => {
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
      'UPDATE Planet SET name = $2, "visitedBy" = $3, status = $4, description = $5, "imageURL" = $6, "numberOfRobots"=$7 WHERE "planetID" = $1',
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
    deletePlanet
}