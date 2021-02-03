import {Router} from "express";
import PagesController from '../../controllers/page.controller'
const router = Router();

// Get all emission
router.get("/", PagesController.index);

// Create a new emission
router.post("/", PagesController.create);

export default router;
