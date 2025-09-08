const Bag = require("../models/bag");
const cloudinary = require("../config/cloudinary");
const{ validationResult} = require("express-validator")


//GET /api/bags -> fetch all basg (with optional category/ search)
exports.getBags = async(req, res) => {
    try{
        let query = {};

        // Filter by category (single or multiple)
        if (req.query.category) {
            const categories = req.query.category.split(","); // allow comma-separated categories
            query.category = { $in: categories };
        }

        // Search by name or brand
        if (req.query.search) {
            query.$or = [
                { name: { $regex: req.query.search, $options: "i" } },
                { brand: { $regex: req.query.search, $options: "i" } }
        ];
        }
        
        // Filter by stock availability
        if (req.query.inStock) {
        query.stock = { $gt: 0 }; // only bags with stock > 0
        };

        // Filter by price range
        if (req.query.minPrice || req.query.maxPrice) {
        query.price = {};
        if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
        if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
        };

        // Pagination
            const page = parseInt(req.query.page) || 1;   // current page, default 1
            const limit = parseInt(req.query.limit) || 10; // items per page, default 10
            const skip = (page - 1) * limit;

            // Fetch bags with filters + pagination
            const bags = await Bag.find(query)
            .skip(skip)
            .limit(limit);

            // Count total for frontend (to know how many pages exist)
            const total = await Bag.countDocuments(query);

            res.status(200).json({
            total,
            page,
            pages: Math.ceil(total / limit),
            bags
            });

    }catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }
};

//POST /api/bags -> add new bag(admin only)
exports.addBag = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, description, price, brand, category, stock } = req.body;

        // create bag (saved already)
        let bag = await Bag.create({ name, description, price, brand, category, stock });

        if (req.file) {
            try {
                const result = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: "bags" },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    stream.end(req.file.buffer);
                });

                bag.imageUrl = result.secure_url;
                bag.cloudinary_id = result.public_id;
                await bag.save(); // only save if image added
            } catch (error) {
                return res.status(500).json({ message: error.message });
            }
        }

        res.status(201).json(bag);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


//PUT /api/bags/:id -> edit bag(admin only)
exports.editBag = async (req, res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const bagId = req.params.id;
        const updates = { ...req.body };

    if (req.file) {
      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload_stream(
        { folder: "bags" },
        async (error, result) => {
          if (error) return res.status(500).json({ message: error.message });
          updates.imageUrl = result.secure_url;
          const updatedBag = await Bag.findByIdAndUpdate(bagId, updates, {
            new: true,
          });
          if (!updatedBag)
            return res.status(404).json({ message: "Bag not found" });
          return res.status(200).json(updatedBag);
        }
      );
      result.end(req.file.buffer);
    } else {
        const updatedBag = await Bag.findByIdAndUpdate(bagId, updates, {
            new: true,
        });
        if (!updatedBag) return res.status(404).json({ message: "Bag not found" });
        res.status(200).json(updatedBag);
    }
    } catch(err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

//DELETE /api/bags/:id -> delete bag (admin only)
exports.deleteBag = async (req, res) => {
  try {
    const bagId = req.params.id;
    const bag = await Bag.findById(bagId);
    if (!bag) return res.status(404).json({ message: "Bag not found" });

    // Delete image from Cloudinary
    if (bag.cloudinary_id) {
      await cloudinary.uploader.destroy(bag.cloudinary_id);
    }

    // Delete bag from database
    await Bag.findByIdAndDelete(bagId);

    res.status(200).json({ message: "Bag deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

