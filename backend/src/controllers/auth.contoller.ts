import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";


// Define request body interface
interface SignupRequestBody {
    username: string;
    password: string;
}

// Define the handlers with RequestHandler type
export const signin = async (req: Request, res: Response) =>{
    try{
        const {username, password} = req.body;
        
        if(!username ||!password){
            res.status(400).json({error: "Username and password are required"});
            return;
        }

        const user = await prisma.user.findUnique({ where: { username } });
        if(!user){
            res.status(400).json({error: "Invalid username or password"});
            return;
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            res.status(400).json({error: "Invalid username or password"});
            return;
        }

        generateToken(user.id, res);

		res.status(200).json({
			id: user.id,
			username: user.username,
		});
    }catch(error){
        console.error("Error in signin:", error);
        res.status(500).json({ error: "Internal Server Error" }); 
    }
}

export const signup = async (req: Request, res: Response)=> {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ error: "Username and password are required" });
            return;
            
        }
        const user = await prisma.user.findUnique({ where: { username } });
        if (user) {
			res.status(400).json({ error: "Username already exists" });
            return;
		}

        const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await prisma.user.create({
			data: {
				username,
				password: hashedPassword
			},
		});

        
		if (newUser) {
			// generate token in a sec
			generateToken(newUser.id, res);

			res.status(201).json({
				id: newUser.id,
				username: newUser.username,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
        
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ error: "Internal Server Error" }); 
    }
}

export const logout = async (req: Request, res: Response) =>{
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error: any) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const getMe = async (req: Request, res: Response) => {
	try {
		const user = await prisma.user.findUnique({ where: { id: req.user.id } });

		if (!user) {
			res.status(404).json({ error: "User not found" });
            return ;
		}

		res.status(200).json({
			id: user.id,
			username: user.username,
		});
	} catch (error: any) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};