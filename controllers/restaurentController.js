const restaurentModel = require("../models/restaurentModel");

// CREATE RESTURANT
const createRestaurentController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }
    const newRestaurent = new restaurentModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurent.save();

    res.status(201).send({
      success: true,
      message: "New Restaurent Created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Restaurent api",
      error,
    });
  }
};
// GET ALL RESTURNAT
const getAllRestaurentController = async (req, res) => {
  try {
    const restaurent = await restaurentModel.find({});
    if (!restaurent) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Availible",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurent.length,
      restaurent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get ALL Restaurent API",
      error,
    });
  }
};
// GET RESTURNAT BY ID
const getRestaurentByIdController = async (req, res) => {
  try {
    const restaurentId = req.params.id;
    if (!restaurentId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Resturnat ID",
      });
    }
    //find resturant
    const restaurent = await restaurentModel.findById(restaurentId);
    if (!restaurent) {
      return res.status(404).send({
        success: false,
        message: "no resturant found",
      });
    }
    res.status(200).send({
      success: true,
      restaurent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Restaurent by id api",
      error,
    });
  }
};
//DELETE RESTRURNAT
const deleteRestaurentController = async (req, res) => {
  try {
    const restaurentId = req.params.id;
    if (!restaurentId) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Found OR Provide Resturant ID",
      });
    }
    await restaurentModel.findByIdAndDelete(restaurentId);
    res.status(200).send({
      success: true,
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in delete restaurent api",
      error,
    });
  }
};

module.exports={createRestaurentController,
  getAllRestaurentController,
  getRestaurentByIdController,
  deleteRestaurentController,
 };