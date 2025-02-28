import Property from "../models/Property.js";

/**
 * @desc Create a new property
 * @route POST /api/properties
 * @access Private (Requires authentication)
 */
export const createProperty = async (req, res) => {
  try {
    const { title, description, location, price, images } = req.body;

    const newProperty = await Property.create({
      user: req.user.id,
      title,
      description,
      location,
      price,
      images,
    });

    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Get all properties
 * @route GET /api/properties
 * @access Public
 */
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Get a single property by ID
 * @route GET /api/properties/:id
 * @access Public
 */
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) return res.status(404).json({ message: "Property not found" });

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Update a property
 * @route PUT /api/properties/:id
 * @access Private (Owner only)
 */
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) return res.status(404).json({ message: "Property not found" });

    if (property.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc Delete a property
 * @route DELETE /api/properties/:id
 * @access Private (Owner only)
 */
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) return res.status(404).json({ message: "Property not found" });

    if (property.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await property.remove();
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
