const router = require("express").Router();
const {
  getUser,
  getAllUsers,
  updateUser,
  getMyFavoritesProfiles,
  addToMyFavoritesProfiles,
  deleteFromMyFavoritesProfiles,
  getMyFavoritesApartments,
  addToMyFavoritesApartments,
  deleteFromMyFavoritesApartments,
} = require("../controllers/users");

module.exports = router;

router.get("/:id", getUser);
router.get("/", getAllUsers);
router.put("/:id", updateUser);

router.put("/favoritesProfiles/:id", addToMyFavoritesProfiles);
router.put("/deleteFavoritesProfiles/:id", deleteFromMyFavoritesProfiles);
router.get("/favoritesProfiles/:id", getMyFavoritesProfiles);

router.put("/favoritesApartments/:id", addToMyFavoritesApartments);
router.put("/deleteFavoritesApartments/:id", deleteFromMyFavoritesApartments);
// router.get("/favoritesApartments/:id", getMyFavoritesApartments);
