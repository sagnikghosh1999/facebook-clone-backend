const express = require("express");
const {
  register,
  activateAccount,
  login,
  resendverification,
  findUser,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
  getProfile,
  updateProfilePicture,
  updateCover,
  updateDetails,
  addFriend,
  cancelRequest,
  follow,
  unfollow,
  acceptRequest,
  unfriend,
  deleteRequest,
  search,
  addToSearchHistory,
  getSearchHistory,
  removeFromSearch,
  getFriendsPageInfos,
} = require("../controllers/userController");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/activate", authUser, activateAccount);
router.post("/resendverification", authUser, resendverification);
router.post("/finduser", findUser);
router.post("/sendresetpasswordcode", sendResetPasswordCode);
router.post("/validateresetcode", validateResetCode);
router.post("/changepassword", changePassword);
router.get("/getprofile/:username", authUser, getProfile);
router.put("/updateprofilepicture", authUser, updateProfilePicture);
router.put("/updatecover", authUser, updateCover);
router.put("/updatedetails", authUser, updateDetails);
router.put("/addfriend/:id", authUser, addFriend);
router.put("/cancelrequest/:id", authUser, cancelRequest);
router.put("/follow/:id", authUser, follow);
router.put("/unfollow/:id", authUser, unfollow);
router.put("/acceptrequest/:id", authUser, acceptRequest);
router.put("/unfriend/:id", authUser, unfriend);
router.put("/deleterequest/:id", authUser, deleteRequest);
router.post("/search/:searchterm", authUser, search);
router.put("/addtosearchhistory", authUser, addToSearchHistory);
router.get("/getsearchhistory", authUser, getSearchHistory);
router.put("/removefromsearch", authUser, removeFromSearch);
router.get("/getfriendspageinfos", authUser, getFriendsPageInfos);

module.exports = router;
