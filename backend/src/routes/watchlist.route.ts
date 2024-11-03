import express from "express";
import {add, remove, list} from "../controllers/watchlist.controller.js"
import protectRoutes from "../middlewares/protectRoutes.js";


const router = express.Router();



router.post('/add',protectRoutes, add);
router.put('/remove',protectRoutes,  remove);
router.get('/list',protectRoutes, list);

export default router;
