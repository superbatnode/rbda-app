const functions = require("firebase-functions");
const serviceAccount = require("./gcm.json");
const admin = require("firebase-admin");
require("dotenv").config();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const express = require("express");
const app = express();
const { user } = require("./route.config");
app.use(express.json());
app.use(user);
exports.api = functions.https.onRequest(app);
