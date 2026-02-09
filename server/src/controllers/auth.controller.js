import User from '../models/user.model'
import generateToken from '../utility/generateToken'

//Register new User
export const UserRegistration = async (req,res) => {
    try {
        const {username , email , password} = req.body

        //check if user exists
        const ExistingUser = await User.findOne({$or : [{email},{username}] })

        if(ExistingUser){
            return res.status(400).json({ 
                message: ExistingUser.email === email 
                ? 'Email already registered' 
                : 'Username already taken' 
            });
        }

        // Create new user
        const NewUser = await User.create({
            username,
            email,
            password
        });

        if(NewUser){
            res.status(201).json({
                _id: NewUser._id,
                username: NewUser.username,
                email: NewUser.email,
                avatar: NewUser.avatar,
                token: generateToken(NewUser._id)
            });
        }else{
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//User Login
export const Login = async(req,res) => {
    try {
        const {username , password} = req.body

         // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
}


//Get user profile

export const GetProfile = async(req,res) => {
    try {
        const id = req.user._id

        //get user and add new field
        const user = await User.findById(id).populate('debatesParticipated')

        if (user) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                debatesParticipated: user.debatesParticipated,
                createdAt: user.createdAt
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
}


//Update user details

export const UpdateProfile = async(req,res) => {
    try {
        const _id = req.user._id

        //get user
        const user = await User.findById(id)

        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.avatar = req.body.avatar || user.avatar;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            //return updated user data
            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                avatar: updatedUser.avatar,
                token: generateToken(updatedUser._id)
            });

        }else{
            res.status(404).json({ message: 'User not found' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}