module.exports = (express, app) => {
  const controller = require("../controllers/reaction.controller.js");
  const router = express.Router();

  // Select all comments.
  router.get("/select/:id", controller.all);

  // Create a new comment.
  router.post("/", controller.create);

  // Create a new comment.
  router.post("/delete", controller.delete);

  // find a reaction if it already exists
  router.get("/exist", controller.exist);

  //delete comments
  router.post("/deleteAll", controller.deleteAll);

  // Add routes to server.
  app.use("/api/reactions", router);
};
