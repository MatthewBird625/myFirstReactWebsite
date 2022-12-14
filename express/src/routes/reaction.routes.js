module.exports = (express, app) => {
  const controller = require("../controllers/reaction.controller.js");
  const router = express.Router();
  //see the API in the repository pointing to these routes to understand their purpose(there are some comments in the repo if their purpose is beyond basic)
  // Select all comments.
  router.get("/select/:id", controller.all);

  // Create a new comment.
  router.post("/", controller.create);

  // Create a new comment.
  router.post("/delete", controller.delete);

  // find a reaction if it already exists
  router.get("/exist", controller.exist);

  //delete all reactions for post
  router.post("/deleteAll", controller.deleteAll);
  //delete all reactions for user
  router.post("/deleteUser", controller.deleteUser);

  // Add routes to server.
  app.use("/api/reactions", router);
};
