import { Router } from "express";
import { logout, signin, signup, getMe } from "../controllers/auth.contoller.js";
import protectRoutes from "../middlewares/protectRoutes.js";

const router = Router();

router.get('/me',protectRoutes, getMe);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/logout', logout);

export default router;