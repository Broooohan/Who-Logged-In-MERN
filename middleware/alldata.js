const User = require('../model/userSchema');

const AllData = async (req,res,next) =>{
    try {
        const existData = await User.find({},{_id:0, name:1});

        req.existData = existData;
        req.userID = existData._id;

        next();

    } catch (err) {
        res.status(401).send("Error")
        console.log(err);
    }
}

module.exports = AllData

//iss middleware ke bina bhi kaam jojata hai