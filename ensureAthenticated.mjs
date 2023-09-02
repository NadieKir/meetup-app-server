export const ensureAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401);
    res.send("Not authenticated");
  } else {
    return next();
  }
};
