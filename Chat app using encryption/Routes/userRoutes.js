import userController from "../Controllers/userController.js";
import { Router } from "express";


const router = Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.login);

export default router;