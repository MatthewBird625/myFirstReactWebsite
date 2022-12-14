// THIS FILE IS BASED OF THE RMIT-FWP LAB 08- login-registration-example
module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();
  //see the API in the repository pointing to these routes to understand their purpose(there are some comments in the repo if their purpose is beyond basic)
  // Select all users.
  router.get("/", controller.all);

  // Select a single user with id.
  router.get("/select/:id", controller.one);

  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);

  // update a user
  router.post("/update/", controller.update);

  // update a user password
  router.post("/password/", controller.password);

  // update a user password
  router.post("/delete/", controller.delete);

  // Add routes to server.
  app.use("/api/users", router);
};
