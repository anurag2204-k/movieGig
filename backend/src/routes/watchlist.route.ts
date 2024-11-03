import express from "express";
import {second} from "../controllers/watchlist.controller.js"


const router = express.Router();



router.get('/second', second)

export default router;
