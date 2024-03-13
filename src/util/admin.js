var admin = require("firebase-admin");
var serviceAccount = require("../../serviceAccountKey.json")

admin.initializeApp({
  // projectId: serviceAccount.project_id,
  credential: admin.credential.cert(serviceAccount),
  // serviceAccountId:
  // serviceAccount.client_email, //Tt is used for creating firebase auth credentials
});

const db = admin.firestore();
module.exports = { admin, db };