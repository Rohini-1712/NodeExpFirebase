const { db } = require("../util/admin");

const getAllUsers = async (req,res) => {
  const usersRef = db.collection('Users');
  try {
    usersRef.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
        console.log(data);
        return res.status(201).json(data);
    })
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

module.exports = getAllUsers;
