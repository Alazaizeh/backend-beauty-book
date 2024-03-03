
import { Router } from "express";
import {login,verify,register} from "../../controllers/User/auth.js"
 
const router=Router();

router.route("/login").post(login);
router.route("/verify").post(verify);
router.route("/register").post(register);


export default router;