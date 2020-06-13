import { v2 } from 'cloudinary';
import { Request, Response, NextFunction } from 'express';

export const cloudinaryConfig = (req: Request, res: Response, next: NextFunction) => {
    v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    next();
}