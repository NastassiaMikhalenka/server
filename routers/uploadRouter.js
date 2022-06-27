import Router from 'express';
import checkAuth from "../middleware/checkAuth.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        // if (!fs.existsSync('uploads')) {
        //     fs.mkdirSync('uploads');
        // }
        cb(null, './uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

export const upload = multer({storage});

const router = new Router();
router.post('/', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `./uploads/${req.file.originalname}`,
    });
});

export default router;