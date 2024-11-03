import express from "express";
import authRoutes from "./routes/auth.route.js"
import watchlistRoutes from "./routes/watchlist.route.js"
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("Welcome to MovieGig API!");
})
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false,
        error: "Internal Server Error" 
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});