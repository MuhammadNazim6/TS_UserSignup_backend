import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from '../models/userModel';

const securePassword = async (password: string): Promise<string> => {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
};

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if(name && email &&  password ){
    const hashedPassword = await securePassword(password);
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      res.status(400).json({ message: 'This email already exists' });
    } else {
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      const userDataSaved = await newUser.save();
      if (userDataSaved) {
        res.json({ status: 'success', message: 'User registered successfully' });
      } else {
        throw new Error('Failed to signup');
      }
    }
  }else{
    res.json({ status: 'failed', message: 'Please enter all details' });
        
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
        // req.session.userId = user._id
        console.log(user.name, 'Logged in')
        res.json({ status: "success", message: 'User login successfull' })
    } else {
        res.status(401)
        throw new Error('Email or Password is incorrect')
    }
} else {
    res.status(401)
    throw new Error('Email or Password is incorrect')
}
};


const logoutUser = async (req: Request, res: Response) => {
  // req.session.destroy();

  res.json({status:'success', message: "User logged out" });
}; 


export { registerUser ,loginUser, logoutUser };
