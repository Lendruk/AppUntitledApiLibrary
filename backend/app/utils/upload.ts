import { v2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

const storage = new CloudinaryStorage({
    cloudinary: v2,
    params: {
        resource_type: "auto",
        format: async (req, file) => {
            const split = file.originalname.split('.');
            const fileExt = split[split.length - 1];
            return `${fileExt}`;
        }
    }
});

export const parser = multer({ storage: storage });
