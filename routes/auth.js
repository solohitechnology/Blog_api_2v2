 const User = '../models/Users';
// const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt';


// REGISTER

export const Register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashpass = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashpass,
    })
    const user = await newUser.save();
    res.status(200).json(user)

} catch (err) {
    res.status(500).json(err);
}
}

// //PASSWORD
export const Login = async (req, res, next) => {p
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json('wrong credentials');

        const iscorrectpass = await bcrypt.compare(req.body.password, user.password)
        !iscorrectpass && res.status(400).json('wrong credentials')
           
        const { password, ...others} =  res.status(200).json( others )
   }catch (err) {
       res.status(500).json(err)
   }
};

