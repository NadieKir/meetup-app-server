import express from "express";
import passport from "passport";
import { ensureAuthenticated } from "../ensureAthenticated.mjs";

export const loginRoutes = express.Router();

// cookie-based authentication
loginRoutes.get("/login", ensureAuthenticated, 
  (req, res) => res.json({ user: req.user }))

loginRoutes.post(
  "/login",
  function (req, res, next) {
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    const user = JSON.parse(JSON.stringify(req.user)); // hack
    const cleanUser = Object.assign({}, user);

    if (cleanUser.local) {
      delete cleanUser.local.password;
    }

    res.json({ user: cleanUser });
  }
);

loginRoutes.get("/logout", function (req, res, next) {
  req.logout();
  res.status(200);

  res.send({});
});
