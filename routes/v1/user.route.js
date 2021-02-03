import {Router} from "express";
import UsersController from '../../controllers/user.controller'
const router = Router();

// Get all emission
//router.get("/", UsersController.index);

// Create a new emission
router.post("/", UsersController.create);

export default router;
