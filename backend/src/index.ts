import express from "express";
import authRoutes from "./routes/auth.route.js"
import watchlistRoutes from "./routes/watchlist.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path";


import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Frontend UR
    credentials: true,  // Allow sending cookies
  }));


app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);



if (process.env.NODE_ENV !== "development") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});