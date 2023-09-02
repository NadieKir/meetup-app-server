import express from "express";

export const votedUsersRoutes = (db) => {
  const votedUsersRouter = express.Router();

  votedUsersRouter.get("/", async (req, res) => {
    res.send(db.data.votedUsers);
  });

  return votedUsersRouter;
};
