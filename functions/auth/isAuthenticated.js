const admin = require("firebase-admin");
const isAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: "unauthorized" });
  if (!authorization.startsWith("Bearer"))
    return res.status(401).json({ message: "unauthorized" });
  const split = authorization.split("Bearer ");
  if (split.length !== 2)
    return res.status(401).send({ message: "Unauthorized" });
  const token = split[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("decodedToken", JSON.stringify(decodedToken));
    res.locals = {
      ...res.locals,
      uid: decodedToken.uid,
      role: decodedToken.role,
      email: decodedToken.email,
    };
    return next();
  } catch (err) {
    console.error(`${err.code} -  ${err.message}`);
    return res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
