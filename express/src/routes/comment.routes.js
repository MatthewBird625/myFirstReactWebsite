module.exports = (express, app) => {
  const controller = require("../controllers/comment.controller.js");
  const router = express.Router();

  //see the API in the repository pointing to these routes to understand their purpose(there are some comments in the repo if their purpose is beyond basic)

  // Select all comments.
  router.get("/select/:id", controller.all);

  // Create a new comment.
  router.post("/", controller.create);

  //delete comments
  router.post("/deleteAll", controller.deleteAll);

  //delete all comments for user
  router.post("/deleteUser", controller.deleteUser);

  // Add routes to server.
  app.use("/api/comments", router);
};
