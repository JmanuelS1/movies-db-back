const { getAll, create, getOne, remove, update, setActor, setDirector, setGenre } = require('../controllers/movie.controllers')
const express = require('express')

const routerMovie = express.Router()
routerMovie.route('/')
   .get(getAll)
   .post(create)

routerMovie.route('/:id/actors')
   .post(setActor)

routerMovie.route('/:id/directors')
   .post(setDirector)

routerMovie.route('/:id/genres')
   .post(setGenre)

routerMovie.route('/:id')
   .get(getOne)
   .delete(remove)
   .put(update)

module.exports = routerMovie