import express from "express";

export const usersRoutes = (db) => {
  const router = express.Router();
  router.get("/", async (req, res) => {
    res.send(db.data.users);
  });

  router.get("/:id", async (req, res) => {
    const user = db.data.users.find((p) => p.id === req.params.id);
    res.send(user);
  });
  return router;
};
