import Image from "../models/Image.js";
import path from 'path'; // Import path module to extract file name
export const genrateQuestionSetsController = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }


    
    const fileName = file.filename;
    const filePath = `/${file.filename}`;

    // Save file information to the database
    const savedImage = await Image.create({
      fileName,
      filePath,
    });

    const baseURL = `${req.protocol}://${req.get("host")}`;
    const fileURL = `${baseURL}${filePath}`;

    res.status(200).json({
      message: "File uploaded successfully!",
      file: {
        id: savedImage.id,
        fileName: savedImage.fileName,
        filePath: savedImage.filePath,
        url: fileURL,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getImgByIdController = async (req, res) => {
  try {
    const { id } = req.query; // Extract id from query parameters

    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }

    // Find the image by ID
    const image = await Image.findByPk(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found!" });
    }

    // Return the filePath
    res.status(200).json({
      message: "Image fetched successfully!",
      filePath: image.filePath,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// jsonController.js
export const Jsoncontroller = async (req, res) => {
  try {
    const { id } = req.body; // Extract 'id' from the request body

    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    // Find the Image record by ID
    const image = await Image.findByPk(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found!" });
    }

    // Update the jsonFilePath for the specific image
    image.jsonFilePath = req.file.path; // Save the full file path in the database
    await image.save(); // Save the changes to the database

    // Extract just the file name from the file path
    const fileName = path.basename(req.file.path);
   console.log(fileName.split("\\")[0])
    // Respond with success message and the file name
    res.status(200).json({
      message: "JSON file uploaded and associated successfully!",
      jsonFilePath: fileName.split("\\")[0], // Return only the file name, not the full path
    });
  } catch (error) {
    console.error("Error uploading JSON file:", error);
    res
      .status(500)
      .json({ message: "Error uploading JSON file", error: error.message });
  }
};

export const getJsonByIdController = async (req, res) => {
  try {
    const { id } = req.query; // Extract id from query parameters

    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }

    // Find the image by ID (assuming JSON file paths are stored in the same model)
    const image = await Image.findByPk(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found!" });
    }
    console.log(image.jsonFilePath.split("\\")[1])
    // Return the jsonFilePath
    res.status(200).json({
      message: "JSON file fetched successfully!",
      jsonFilePath: "images/" +image.jsonFilePath.split("\\")[1], // Returning the path of the JSON file
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
