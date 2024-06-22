require('../models')
const request = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')

const BASE_URL = '/api/v1/movies'

let movieId
let actor
let director
let genre

const movie = {
   name: 'Titanic',
   image: 'lorem.png',
   synopsis: 'is a romantic drama about the tragic maiden voyage of the RMS Titanic, where Jack and Ross forbidden love is tested by the ship catastrophic sinking.',
   releaseYear: '1995'
}

afterAll(async () => {
   await actor.destroy()
   await director.destroy()
   await genre.destroy()
})

test("POST -> 'BASE_URL', should return status code 201, and res.body.name === movie.name", async () => {
   const res = await request(app)
      .post(BASE_URL)
      .send(movie)

   movieId = res.body.id

   expect(res.statusCode).toBe(201)
   expect(res.body).toBeDefined()
   expect(res.body.name).toBe(movie.name)
})

test("GET -> 'BASE_URL', should return status code 200 and res.body[0].name === movie.name", async () => {
   const res = await request(app)
      .get(BASE_URL)

   expect(res.statusCode).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body[0].name).toBe(movie.name)
})

test("GET -> 'BASE_URL/:id', should return status code 200 and res.body.name", async () => {
   const res = await request(app)
      .get(`${BASE_URL}/${movieId}`)

   expect(res.statusCode).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body.name).toBe(movie.name)
})

test("PUT -> 'BASE_URL/:id', should return status code 200 and res.body.name === movieUpdate.name", async () => {
   const movieUpdate = {
      name: 'Mission Impossible',
      image: 'lorem.png',
      synopsis: 'follows Ethan Hunt, an IMF agent, as he undertakes daring missions to thwart global threats, relying on his wit, skills, and high-tech gadgets to achieve the impossible.',
      releaseYear: '1996'
   }

   const res = await request(app)
      .put(`${BASE_URL}/${movieId}`)
      .send(movieUpdate)

   expect(res.status).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body.name).toBe(movieUpdate.name)
})

test("POST -> 'BASE_URL/:id/actors', should return status code 200 and res.body.length = 1", async () => {
   actor = await Actor.create({
      firstName: 'Tom',
      lastName: 'Cruise',
      nationality: 'United States',
      image: 'lorem.png',
      birthday: '1950-12-10'
   })

   const res = await request(app)
      .post(`${BASE_URL}/${movieId}/actors`)
      .send([actor.id])

   expect(res.statusCode).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body).toHaveLength(1)

   expect(res.body[0].MovieActors.actorId).toBeDefined()
   expect(res.body[0].MovieActors.actorId).toBe(actor.id)

   expect(res.body[0].MovieActors.movieId).toBeDefined()
   expect(res.body[0].MovieActors.movieId).toBe(movieId)
})

test("POST -> 'BASE_URL/:id/directors', should return status code 200 and res.body.length = 1", async () => {
   director = await Director.create({
      firstName: 'Christopher',
      lastName: 'McQuarrie',
      nationality: 'United States',
      image: 'lorem.png',
      birthday: '1969-06-12'
   })

   const res = await request(app)
   .post(`${BASE_URL}/${movieId}/directors`)
   .send([director.id])

   expect(res.statusCode).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body).toHaveLength(1)

   expect(res.body[0].MovieDirectors.directorId).toBeDefined()
   expect(res.body[0].MovieDirectors.directorId).toBe(director.id)

   expect(res.body[0].MovieDirectors.movieId).toBeDefined()
   expect(res.body[0].MovieDirectors.movieId).toBe(movieId)
})

test("POST -> 'BASE_URL/:id/genres', should return status code 200 and res.body.length = 1", async () => {
   genre = await Genre.create({
      name: 'Romantic'
   })

   const res = await request(app)
   .post(`${BASE_URL}/${movieId}/genres`)
   .send([genre.id])

   expect(res.statusCode).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body).toHaveLength(1)

   expect(res.body[0].MovieGenres.genreId).toBeDefined()
   expect(res.body[0].MovieGenres.genreId).toBe(genre.id)

   expect(res.body[0].MovieGenres.movieId).toBeDefined()
   expect(res.body[0].MovieGenres.movieId).toBe(movieId)
})


test("DELETE -> 'BASE_URL/:id', return status code 204", async () => {
   const res = await request(app)
      .delete(`${BASE_URL}/${movieId}`)

   expect(res.status).toBe(204)
})