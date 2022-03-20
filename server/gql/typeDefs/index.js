const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Planet {
    id: String!
    name: String!
    quote: String!
    day_length: Int
    environment: String
    img: String!
  }

  type User {
    id: String!
    username: String!
    title: String!
    house: String!
    planet: Planet
    email: String!
    img: String!
  }

  type Query {
    planets: [Planet]!
    contacts(id: ID!): [User]!
    user(id: ID!): User
  }
`;

module.exports = typeDefs;
