const {db} = require('../util/admin');

const updateUser = async(req,res)=>{
    const userRef = db.collection('Users'); 
    try {
        const userId = req.params;
        const data = req.body;
        let docRef = usersRef.doc(userId).updateDoc(data);
        res.status(200).send(docRef, 'product updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
} 

module.exports = updateUser;