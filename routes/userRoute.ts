import {registerUser ,loginUser ,logoutUser} from '../controller/userController';

import express from "express"
const userRoute = express()

userRoute.post('/register',registerUser)
userRoute.post('/login', loginUser)
userRoute.post('/logout', logoutUser)


export default userRoute