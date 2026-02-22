const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.makeAdmin = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only admins can assign admin roles."
    );
  }

  const { email } = data;

  const user = await admin.auth().getUserByEmail(email);

  await admin.auth().setCustomUserClaims(user.uid, {
    admin: true,
  });

  return { message: `${email} is now an admin.` };
});
