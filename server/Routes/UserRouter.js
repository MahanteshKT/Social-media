
import express from "express";
// token vierification middleware
import {VerifyToken} from "../middleware/AuthMiddleware.js";
import {
    GetUser,GetUserFriends,AddRemoveFriends
} from "../controllers/UserControllers.js";

const router =express.Router();

/* READ */
//geting the user details
router.get("/:id",VerifyToken,GetUser);

//getting the userFriends details
router.get("/:id/friends",VerifyToken,GetUserFriends);


/*UPDATE */
//adding and removing the friends
router.patch("/:id/:friendId",VerifyToken,AddRemoveFriends);


export default router;