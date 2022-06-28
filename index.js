import 'dotenv/config';
import express from 'express';
import mongoose from "mongoose";
import router from "./routers/index.js";
import cors from 'cors';

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json()); // позволяет читать json в наших запросах

app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use('/', router);

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server started on port ${PORT}`);
});