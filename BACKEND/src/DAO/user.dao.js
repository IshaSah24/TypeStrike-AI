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

export const saveTypingHistory = async (userId, result) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    user.typingHistory.push(result);
    await user.save();
    return user.typingHistory[user.typingHistory.length - 1];
}

export const getTypingHistory = async (userId) => {
    const user = await User.findById(userId).select('typingHistory');
    if (!user) {
        throw new Error("User not found");
    }
    return user.typingHistory || [];
}

export const saveRaceHistory = async (userId, result) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    user.raceHistory.push(result);
    await user.save();
    return user.raceHistory[user.raceHistory.length - 1];
}

export const getRaceHistory = async (userId) => {
    const user = await User.findById(userId).select('raceHistory');
    if (!user) {
        throw new Error("User not found");
    }
    return user.raceHistory || [];
}