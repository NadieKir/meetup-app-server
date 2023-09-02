import express from "express";
import faker from "faker";

export const meetupsRoutes = (db) => {
  const meetupsRouter = express.Router();

  meetupsRouter.get("/", async (req, res) => {
    res.send(db.data.meetups);
  });

  meetupsRouter.post("/", async (req, res) => {
    try {
      const response = {
        id: faker.datatype.uuid(),
        modified: new Date(),
        author: {
          id: req.body.author.id,
          name: req.body.author.name,
          surname: req.body.author.surname,
        },
        subject: req.body.subject,
        excerpt: req.body.excerpt,
        status: "DRAFT",
      };

      db.data.votedUsers[response.id] = [];
      db.data.meetups.push(response);

      await db.write();

      res.send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  meetupsRouter.put("/", async (req, res) => {
    const index = db.data.meetups.findIndex((it) => it.id === req.body.id);
    db.data.meetups[index] = {...db.data.meetups[index], ...req.body, modified: new Date()};

    if (db.data.participants[req.body.id] === undefined) db.data.participants[req.body.id] = [];
    
    await db.write();

    res.send(db.data.meetups[index]);
  });

  meetupsRouter.get("/status/:status", async (req, res) => {
    const meetups = db.data.meetups.filter((it) => it.status === req.params.status);
    
    res.send(meetups);
  });

  meetupsRouter.get("/:id", async (req, res) => {
    const meetup = db.data.meetups.find((m) => m.id === req.params.id);

    if (!meetup) {
      res.sendStatus(404);
    }

    res.send(meetup);
  });

  meetupsRouter.delete("/:id", async (req, res) => {
    const index = db.data.meetups.findIndex((it) => it.id === req.params.id);

    if (index >= 0) {
      db.data.meetups.splice(index, 1);
      delete db.data.votedUsers[req.params.id];
      delete db.data.participants[req.params.id];
    }

    await db.write();

    res.send({});
  });

  meetupsRouter.get(
    "/:id/participants",
    async (req, res) => {
      res.send(db.data.participants[req.params.id]);
    }
  );

  meetupsRouter.post(
    "/:id/participants",
    async (req, res) => {
      try {
        const {
          id,
          name,
          surname
        } = req.body;

        const meetupId = req.params.id;
        const participants = db.data.participants[meetupId];
        const checkUser = participants.find((user) => user.id === id);

        if (checkUser) {
          return res.status(400).send({ message: 'Participant is already exist' });
        }

        participants.unshift({ id, name, surname });

        await db.write();

        res.send(participants);
      } catch (e) {
        res.status(500).send(e);
      }
    }
  );

  meetupsRouter.delete(
    "/:id/participants",
    async (req, res) => {
      try {
        const userId = req.body.id;
        const meetupId = req.params.id;
        const participants = db.data.participants[meetupId];

        if (!userId) {
          return res.status(400).send({ message: 'Invalid request data' });
        }

        const findedUser = participants.find(u => u.id === userId);
        if (!findedUser) {
          return res.status(404).send({ message: 'Participant not found' });
        }

        db.data.participants[meetupId] = participants.filter(u => u.id !== userId);

        await db.write();

        res.send(db.data.participants[meetupId]);
      } catch (e) {
        res.status(500).send(e);
      }
    }
  );

  meetupsRouter.get(
    "/:id/votedusers",
    async (req, res) => {
      res.send(db.data.votedUsers[req.params.id]);
    }
  );

  meetupsRouter.post(
    "/:id/votedusers",
    async (req, res) => {
      try {
        const {
          id,
          name,
          surname
        } = req.body;

        const meetupId = req.params.id;
        const checkUser = db.data.votedUsers[meetupId].find((user) => user.id === id)
        
        if (checkUser) {
          return res.status(400).send({ message: 'The user is already voted' });
        }

        const votedUsers = db.data.votedUsers[meetupId];
        votedUsers.unshift({ id, name, surname });

        await db.write();

        res.send(votedUsers);
      } catch (e) {
        res.status(500).send(e);
      }
    }
  );

  meetupsRouter.delete(
    "/:id/votedusers",
    async (req, res) => {
      try {
        const userId = req.body.id;
        const meetupId = req.params.id;
        const users = db.data.votedUsers[meetupId];

        const findedUser = users.find(u => u.id === userId);
        if (!findedUser) {
          return res.status(404).send({ message: 'User not found' });
        }

        db.data.votedUsers[meetupId] = users.filter(u => u.id !== userId);

        await db.write();
        
        res.send(db.data.votedUsers[meetupId]);
      } catch (e) {
        res.status(500).send(e);
      }
    }
  );

  return meetupsRouter;
};
