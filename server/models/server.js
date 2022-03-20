const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const path = require("path");
const { typeDefs, resolvers, context } = require("../gql");
const { validateToken } = require("../middleware/validate-token");

class Server {
  constructor() {
    this.app = express();
    this.apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context,
    });
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      public: "/public",
      gql: "/gql",
    };

    this.middlewares();
    this.routes();
  }

  async middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    // Pick up React index.html file
    this.app.use(express.static(path.join(__dirname, "../../client/build")));

    // Start and hook the Apollo server to Express
    await this.apolloServer.start();
    this.apolloServer.applyMiddleware({
      app: this.app,
      path: this.paths.gql, // Custom path
    });
  }

  // Bind controllers to routes
  routes() {
    // REST api
    this.app.use(this.paths.auth, require("../routes/auth"));

    // Validate authorization header for all GQL requests
    this.app.use(this.paths.gql, validateToken);

    // Serve static files
    this.app.use(
      this.paths.public,
      express.static(path.join(__dirname, "../public"))
    );

    // Catch all requests that don't match any route
    this.app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../../client/build/index.html"));
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

module.exports = Server;
