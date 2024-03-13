const {admin} = require('../util/admin');

const verifyToken = async(req,res)=>{
    try {
        const idtoken = req.body.id;
        const decodedToken = await admin.auth().verifyIdToken(idtoken);
        const email = decodedToken.email;
        console.log("token", idtoken , "decodetoken", decodedToken , 'email', email);
        res.status(200).json({ message: 'OTP verification successful' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = verifyToken;