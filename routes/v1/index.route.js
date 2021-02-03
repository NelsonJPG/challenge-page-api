import {Router} from "express";
import api from '../../index';
import PageRoute from './page.route'
import UserRoute from './user.route'
import AuthRoute from './auth.route'

const router = Router();

/* GET home page. */
router.get('/', (req, res, next) => { 
  res.json({ 
    name: api.get("pkg").name,
    description: api.get("pkg").description,
    author: api.get("pkg").author,
    version: api.get("pkg").version
  });
});
  
router.post('/', (req, res, next) => { 
  res.json({ 
      name: api.get("pkg").name,
      description: api.get("pkg").description,
      author: api.get("pkg").author,
      version: api.get("pkg").version
  });
});

router.use("/pages", PageRoute);
router.use("/users", UserRoute);
router.use("/auth", AuthRoute);

export default router;


