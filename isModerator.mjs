export const isModerator = (req, res, next) => {
  if (req.user.roles !== 'CHIEF') {
    res.status(403).json({ message: 'You are not a moderator' });
  } else {
    return next();
  }
};
