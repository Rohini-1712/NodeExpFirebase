const { admin } = require('../util/admin');
const USER = require('../constants/constants');

const verifyToken = async (req, res) => {
    try {
        const otp = req.query.otp;
        console.log("otp", otp, '----', "saved otp", USER.OTP);
        if (otp == USER.OTP) {
            console.log("valid")
            admin.auth().createCustomToken(otp).then((cToken) => {
                // Send token back to client
                console.log()
                res.status(200).send({ token: cToken, otp: otp, message: 'OTP verification successful' });
            })
                .catch((error) => {
                    console.log('Error creating custom token:', error);
                });
        } else {
            console.log("Invalid otp");
            res.status(400).send({ message: 'Invalid Otp' });
        }

    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = verifyToken;