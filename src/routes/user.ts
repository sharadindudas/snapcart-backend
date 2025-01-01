import { Router } from "express";
import { deleteuser, getallusers, getsingleuser, getuserdetails } from "../controllers/user";
import { validator } from "../middlewares/validator";
import { TokenSchema } from "../schemas/auth";
import { verifyjwt } from "../middlewares/verifyjwt";
import { verifyadmin } from "../middlewares/verifyadmin";
import { UserIdSchema } from "../schemas/common";

const userRouter = Router();

userRouter.get("/profile", validator("cookies", TokenSchema), verifyjwt, getuserdetails);
userRouter.get("/profile/all", validator("cookies", TokenSchema), verifyjwt, verifyadmin, getallusers);
userRouter
    .route("/profile/specific/:id")
    .get(validator("cookies", TokenSchema), verifyjwt, verifyadmin, validator("params", UserIdSchema), getsingleuser)
    .delete(validator("cookies", TokenSchema), verifyjwt, verifyadmin, validator("params", UserIdSchema), deleteuser);

export default userRouter;
