const admin = require("firebase-admin");
const userController = {
  async create(req, res, next) {
    if (
      !req.body ||
      !req.body.name ||
      !req.body.email ||
      !req.body.password ||
      !req.body.role
    )
      return res
        .status(400)
        .json({ message: "name, email, role,  and password required" });
    try {
      const { uid } = await admin.auth().createUser(req.body);
      const role = req.body.role;
      await admin.auth().setCustomUserClaims(uid, { role });
      return res.status(201).json({ uid });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        error: true,
        message: "internal server error",
      });
    }
  },
  async get(req, res, next) {
    try {
      const { id } = req.params;
      const user = await admin.auth().getUser(id);
      return res.status(200).send({ user: mapUser(user) });
    } catch (err) {
      return handleError(res, err);
    }
  },
  async patch(req, res, next) {
    try {
      const { id } = req.params;
      const { name, password, email, role } = req.body;

      if (!id || !name || !password || !email || !role) {
        return res.status(400).send({ message: "Missing fields" });
      }
      await admin.auth().updateUser(id, { name, password, email });
      await admin.auth().setCustomUserClaims(id, { role });
      const user = await admin.auth().getUser(id);
      return res.status(204).send({ user: mapUser(user) });
    } catch (err) {
      return handleError(res, err);
    }
  },
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await admin.auth().deleteUser(id);
      return res.status(204).send({});
    } catch (err) {
      return handleError(res, err);
    }
  },
  async all(req, res, next) {
    try {
      const listUsers = await admin.auth().listUsers();
      const users = listUsers.users.map(mapUser);
      return res.status(200).send({ users });
    } catch (err) {
      return handleError(res, err);
    }
  },
  //   : admin.auth.UserRecord
  async mapUser(user) {
    const customClaims = user.customClaims;
    const role = customClaims.role ? customClaims.role : "";
    return {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      role,
      lastSignInTime: user.metadata.lastSignInTime,
      creationTime: user.metadata.creationTime,
    };
  },
};

function handleError(res, err) {
  return res.status(401).json(err);
}

module.exports = userController;
