const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurentController,
  getAllRestaurentController,
  getRestaurentByIdController,
  deleteRestaurentController,
} = require("../controllers/restaurentController");

const router = express.Router();

//routes
// CRAETE RESTURANT || POST
router.post("/create", authMiddleware, createRestaurentController);
// GET ALL RESTURANTS || GET
router.get("/getAll", getAllRestaurentController);
// GET RESTURANT BY ID || GET
router.get("/get/:id", getRestaurentByIdController);
// DELETE RESTURANT || DELETE
router.delete("/delete/:id", authMiddleware, deleteRestaurentController);
module.exports = router;