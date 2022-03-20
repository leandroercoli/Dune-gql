const planets = require("../../mock/planet/planets.json");
const users = require("../../mock/user/users.json");

// Provide resolver functions for the schema fields
const resolvers = {
  Query: {
    planets: () => planets,
    contacts: (_, args) => users.filter((user) => user.id !== Number(args.id)),
    user: (_, args) => users.find((user) => user.id === Number(args.id)),
  },
  User: {
    planet(parent) {
      // Filter the array of planets to only include
      // the planet associated to the user lives
      return planets.find((planet) => planet.id === parent.planet);
    },
  },
};

module.exports = resolvers;
