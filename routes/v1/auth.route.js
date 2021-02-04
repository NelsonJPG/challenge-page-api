import {Router} from "express";
import AuthController from '../../controllers/auth.controller'
const router = Router();

// Get all emission
//router.get("/", UsersController.index);

// Create a new emission
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);

export default router;
