const { admin } = require('../util/admin');
const useremail = require('../constants/constants');

const sendOtptoUser = async (req, res) => {
  try {
    const email = req.query.email;
    var user = {
      uid: null,
      isPresent: false,
    };
    var string = "0123456789"; // strings combination from which OTP code will
    //generate modify to get alphanumeric or special characters
    var otp = "";
    var lenght = string.length;
    for (let a = 0; a < 6; a++) {
      //this block of for loop will create a 6-digit code
      otp += string[Math.floor(Math.random() * lenght)];
    }
    const msg = {
      to: email,
      from: { email: useremail.EMAIL, name: "Rohini" }, 
      subject: "Firebase Auth OTP",
      text: "OTP for signin/signup",
      html: `Your OTP for Firebase Auth with email :::`,
      otp: useremail.OTP
    };
    // checking if user exits
    admin.auth().getUserByEmail(email)
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        user.uid = userRecord.toJSON().uid;
        user.isPresent = true;
        console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
        console.log("prsent");
        res.send(msg);
      // admin.auth()
      //   .createCustomToken(user.uid)
      //   .then((cToken) => {
      //     res.status(200).send({ customToken: cToken, msg:msg });
      //   })
      })
      .catch((error) => {
        user.isPresent = false;
        console.log("not present");
        admin.auth()
          .createUser({
            email: email,
            emailVerified: true,
            displayName: email,
          })
          .then((userRecord) => {
            user.uid = userRecord.toJSON().uid;
            user.isPresent = true;
            res.send(msg);
          }).catch((error)=>{
            console.log(error);
          });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendOtptoUser;