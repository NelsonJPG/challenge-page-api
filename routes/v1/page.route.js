import {Router} from "express";
import PagesController from '../../controllers/page.controller'
const router = Router();

// Get all emission
router.get("/", PagesController.index);
router.get("/:slug/slug", PagesController.indexbyslug);

// Create a new emission
router.post("/", PagesController.create);

export default router;
