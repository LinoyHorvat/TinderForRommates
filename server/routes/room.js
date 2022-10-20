const router = require("express").Router();
const {
  getRoom,
  getAllRooms,
  updateRoom,
  addNewRoom,
} = require("../controllers/rooms");

module.exports = router;

router.get("/:id", getRoom);
router.get("/", getAllRooms);
router.put("/:id", updateRoom);
router.put("/", addNewRoom);
