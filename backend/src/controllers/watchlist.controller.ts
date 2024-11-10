import { Request, Response } from "express";
import prisma from "../db/prisma.js";

export const add = async (req: Request, res: Response) => {
    try {
        const movieData = req.body.movie;
        const userId = req.user.id;  // Access userId from request body

        if (!userId) {
            res.status(401).json({ error: "User ID is missing. Unauthorized" });
            return
        }


        // Extract movie's unique ID and other relevant fields from movieData
        const {
            id: movie_id,
            title,
            original_title,
            original_name,
            name,
            overview,
            poster_path,
            backdrop_path,
            original_language,
            release_date,
            adult,
            genre_ids,
            popularity,
            vote_average,
            vote_count,
            video
        } = movieData;

        // Check if the movie already exists in the user's watchlist
        const existingMovie = await prisma.watchlist.findFirst({
            where: {
                userId: userId,
                movie_id: movie_id.toString(), // Ensure movie_id is a string
            },
        });

        if (existingMovie) {
            res.status(202).json({ error: "Movie already exists in watchlist" });
            return;
        }

        // Add movie to the user's watchlist
        const newEntry = await prisma.watchlist.create({
            data: {
                userId,
                movie_id: movie_id.toString(),
                title,
                original_title,
                original_name,
                name,
                overview,
                poster_path,
                backdrop_path,
                original_language,
                release_date,
                adult,
                genre_ids,
                popularity: parseFloat(popularity), // Ensure numerical fields are correct types
                vote_average: parseFloat(vote_average),
                vote_count,
                video,
            },
        });

        res.status(201).json({ message: "Movie added to watchlist", data: newEntry });
    } catch (err) {
        console.error("Error in add function:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.body; // id of the watchlist entry to remove
        const userId = req.user.id;

        // Check if the movie exists in the user's watchlist using the id
        const existingMovie = await prisma.watchlist.findUnique({
            where: {
                id: id, // the id of the watchlist entry
            },
        });

        // Verify that the movie belongs to the current user
        if (!existingMovie || existingMovie.userId !== userId) {
             res.status(404).json({ error: "Movie not found in watchlist" });
             return;
        }

        // Delete the movie from the watchlist
        await prisma.watchlist.delete({
            where: {
                id: existingMovie.id,
            },
        });

        res.status(200).json({ message: "Movie removed from watchlist" });
    } catch (err) {
        console.error("Error in remove function:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const list =async(req: Request, res: Response)=>{
    try{
        const userId=req.user.id;
        const ray = await prisma.watchlist.findMany({where:{userId:userId}})

        
        res.status(200).json(ray);
    }
    catch(err){
        console.error("Error in list function:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}