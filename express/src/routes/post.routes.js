// THIS FILE IS BASED OF THE RMIT-FWP LAB 08- login-registration-example

module.exports = (express, app) => {
  const controller = require("../controllers/post.controller.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  // Create a new post.
  router.post("/", controller.create);

  // Create a new post.
  router.post("/deletePost", controller.delete);

  // Create a new post.
  router.post("/editPost", controller.edit);

  //delete all posts for user
  router.post("/deleteUser", controller.deleteUser);
  // Add routes to server.
  app.use("/api/posts", router);
};
