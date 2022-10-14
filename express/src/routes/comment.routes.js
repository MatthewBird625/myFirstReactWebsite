module.exports = (express, app) => {
  const controller = require("../controllers/comment.controller.js");
  const router = express.Router();

  // Select all comments.
  router.get("/select/:id", controller.all);

  // Create a new comment.
  router.post("/", controller.create);

  //delete comments
  router.post("/deleteAll", controller.deleteAll);

  // Add routes to server.
  app.use("/api/comments", router);
};
