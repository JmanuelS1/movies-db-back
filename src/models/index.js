const Actor = require('./Actor')
const Director = require('./Director')
const Genre = require('./Genre')
const Movie = require('./Movie')



Movie.belongsToMany(Actor, { through: 'MovieActors' });
Actor.belongsToMany(Movie, { through: 'MovieActors' });

Movie.belongsToMany(Director, { through: 'MovieDirectors' });
Director.belongsToMany(Movie, { through: 'MovieDirectors' });

Movie.belongsToMany(Genre, { through: 'MovieGenres' });
Genre.belongsToMany(Movie, { through: 'MovieGenres' });