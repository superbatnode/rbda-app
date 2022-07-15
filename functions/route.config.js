const isAuthenticated = require("./auth/isAuthenticated");
const isAuthorized = require("./auth/isAuthorised");
const app = require("express").Router();
const userController = require("./controller/user");

app.post("/users", userController.create);
// lists all users
app.get(
  "/users",
  isAuthenticated,
  isAuthorized({ hasRole: ["admin", "manager"] }),
  userController.all
);
// get :id user
app.get(
  "/users/:id",
  isAuthenticated,
  isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
  userController.get
);
// updates :id user
app.patch(
  "/users/:id",
  isAuthenticated,
  isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
  userController.patch
);
// deletes :id user
app.delete(
  "/users/:id",
  isAuthenticated,
  isAuthorized({ hasRole: ["admin", "manager"] }),
  userController.remove
);

module.exports = { user: app };
