const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const {body} = require("express-validator");
const {getBags, addBag, editBag, deleteBag, getBagById} = require("../controller/bagcontroller");
const{isLoggedIn, isAdmin} = require("../middleware/authMiddleware");


const bagValidationRules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isFloat({gt: 0}).withMessage("Price must be a number"),
    body("category").notEmpty().withMessage("Category is required")
];

router.get("/", getBags);

router.get("/:id", getBagById);

router.post("/", isLoggedIn, isAdmin, upload.single("image"), bagValidationRules, addBag);

router.put("/:id", isLoggedIn, isAdmin, upload.single("image"),bagValidationRules, editBag);

router.delete("/:id", isLoggedIn, isAdmin, deleteBag);

module.exports = router;