import cloudinary from "../config/cloudinary.js";
import Media from "../models/Media.js";
import multer from "multer";

// multer config to storing file locally before uploading to cloudinary.
const storage = multer.diskStorage({ // diskStorage tells Multer to store the file on local disk temporarily.
    destination: (req, file, cb) => { // this tells multer where to store the file
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.split('.')[0] + "-" + Date.now());
    },
});

const upload = multer({ storage: storage });

// upload media to cloudinary
const uploadMedia = async (req, res) => {
    try {
        const file = req.file;

        // upload to cloudinary
        const result = await cloudinary.uploader.upload(file.path); // file.path gives the local path where the file is stored temporarily and Uploads the file to Cloudinary using their SDK.

        // save media info in the db
        const media = new Media({
            url: result.secure_url,
            public_id: result.public_id,
            type: file.mimetype,
        });

        await media.save();
        res.status(201).json({ message: "Media uploaded successfully.", media});
    } catch (error) {
        res.status(500).json({ message: "Error uploading media.", error});
    }
};

const getallMedia = async (req, res) => { 
    try {
        const mediaList = await Media.find().sort({ createdAt: -1});
        res.status(200).json({ media: mediaList, message: "fetching successfully!" })
    } catch (error) {
        res.status(500).json({ message: "Error fetching media.", error });
    }
}

export { upload, uploadMedia, getallMedia }; 