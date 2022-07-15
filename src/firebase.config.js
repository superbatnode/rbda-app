const { initializeApp, applicationDefault } = require("firebase-admin/app");
const {
  getFirestore,
} = require("firebase-admin/firestore");
const firebaseApp = initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();
module.exports = {firebaseApp, db };
