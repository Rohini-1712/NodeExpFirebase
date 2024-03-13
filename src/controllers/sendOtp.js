
const { admin } = require('../util/admin');
// const dotenv = require('dotenv');
// dotenv.config();
// console.log(process.env.USER);

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true, // Use `true` for port 465, `false` for all other ports
//   auth: {
//     user: process.env.USER
//   },
//   tls: {
//     rejectUnauthorized: false
// }
// });
// const mailOptions = {
//   from: {
//     name: 'Rohini',
//     address: process.env.USER
//   },
//   to: email,
//   subject: "Hello ✔", // Subject line
//   text: "Hello world?", // plain text body
//   html: "<b>Hello world?</b>", // html body
// }

// const sng = require("@sendgrid/mail");
// sng.setApiKey(
//   "Sendgrid_API_KEY" // put your sendgrid api key here
// );
const sendOtptoUser = async (req, res) => {
  try {
    const email = req.body.email;
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
    // checking if user exits
    admin.auth().getUserByEmail(email)
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        user.uid = userRecord.toJSON().uid;
       // user.email = userRecord.toJSON().email;
        user.isPresent = true;
        console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
        console.log("prsent");
        const msg = {
          to: email,
          from: { email: "jrohini1712@gmail.com", name: "Rohini" }, 
          subject: "Firebase Auth OTP",
          text: "OTP for signin/signup",
          html: `Your OTP for Firebase Auth with email ::: ${otp}`,
        };
        // res.send(msg);
        console.log("creating custom Token");
      admin.auth()
        .createCustomToken(user.uid)
        .then((cToken) => {
          res.status(200).send({ customToken: cToken, msg:msg });
        })
      })
      .catch((error) => {
        console.log(error);
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
            //user.email = userRecord.toJSON().email;
            user.isPresent = true;
            admin.auth()
            .createCustomToken(user.uid)
            .then((cToken) => {
              res.status(200).send({ customToken: cToken, user: user, otp: otp });
            })
          }).catch((error)=>{
            console.log(error);
          });
      });
    // if (user.isPresent == true) {
    //   console.log("prsent");
    //   const msg = {
    //     to: email,
    //     from: { email: "jrohini1712@gmail.com", name: "Rohini" }, 
    //     subject: "Firebase Auth OTP",
    //     text: "OTP for signin/signup",
    //     html: `Your OTP for Firebase Auth with email ::: ${otp}`,
    //   };
    //   res.send(msg);
    //   // const sendMail = async (transporter, mailOptions) => {
    //   //   try {
    //   //     console.log("transporter", transporter);
    //   //     console.log("mailoptions", mailOptions);
    //   //     await transporter.sendMail(mailOptions);
    //   //     console.log("sent");
    //   //   } catch (error) {
    //   //     console.log(error);
    //   //   }
    //   // }
    //   // sendMail(transporter, mailOptions);
    // } else{
    //   console.log("not present");
    //   await admin.auth()
    //     .createUser({
    //       email: email,
    //       emailVerified: true,
    //       displayName: email,
    //     })
    //     .then((userRecord) => {
    //       user.uid = userRecord.toJSON().uid;
    //       user.isPresent = true;
    //     })
    //     .catch((error) => {
    //       throw new Error(error.message);
    //     });
    //   }
    // sng
    // .send(msg) //sending the mail
    // .then(() => {
    //   res.status(200).send({ message: otp });
    // })
    // .catch((error) => {
    //   console.log(error.message);
    //   throw new Error(error.message);
    // });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendOtptoUser;