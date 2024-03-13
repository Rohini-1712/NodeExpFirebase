const { db } = require("../util/admin");

const setUser = async(req,res)=>{
    const usersRef = db.collection('Users');
    try {
      const user = req.body;
      let docRef = usersRef.doc().set({
        name: user.name,
        email: user.email,
        phoneNo: user.phoneNo
      });
      res.status(201).json(docRef, {message:'done'});
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
    }

    module.exports = setUser;