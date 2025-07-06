import User from '../models/user.model.js'
import bcrypt from 'bcrypt';
export const  findUserByEmail = async(email) =>{
    console.log(email);
    return User.findOne({email})
}



export  const findById =  async (id) => {
    return User.findById (id)
}



export  const  createUser = async (email, password, name) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const  createdUser = new User({
        username : name, 
        email, 
        password: hashedPassword,
    })
    
    await createdUser.save();
    return  createdUser;
}