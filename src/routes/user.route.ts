import { Router } from "express";
import { verifyjwt } from "../middlewares/verifyjwt.middleware";
import { getallusers, getsingleuser, getuserdetails } from "../controllers/user.controller";
import { validatormiddleware } from "../middlewares/validator.middleware";
import { UserIdSchema } from "../schemas/user.schema";
import { TokenSchema } from "../schemas/common";
import { verifyadmin } from "../middlewares/verifyadmin.middleware";

const userRouter = Router();
userRouter.get("/profile", validatormiddleware("cookies", TokenSchema), verifyjwt, getuserdetails);
userRouter.get(
    "/profile/specific/:id",
    validatormiddleware("cookies", TokenSchema),
    validatormiddleware("params", UserIdSchema),
    verifyjwt,
    verifyadmin,
    getsingleuser
);
userRouter.get("/profile/all", validatormiddleware("cookies", TokenSchema), verifyjwt, verifyadmin, getallusers);
export default userRouter;
