import {Router} from "express";
import baseRoute from './v1/index.route'

const router = Router();

/* ruta base */
router.use("/v1", baseRoute);

export default router;
