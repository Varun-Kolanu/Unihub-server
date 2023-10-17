import express from "express";
import { config } from "dotenv";
import {errorMiddleware} from "./middlewares/error.js";
import cors from "cors"
import userRouter from "./routes/user.js"
import announcementRouter from "./routes/announcement.js"
import archiveRouter from "./routes/archive.js"
import swaggerUi from "swagger-ui-express";
import YAML from 'yamljs';


const swaggerDocument = YAML.load('./config/routes.yaml');
export const app = express();
config();

//Using middlewares
app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    }));

//using routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/announcements", announcementRouter);
app.use("/api/v1/archives", archiveRouter);

app.use(errorMiddleware);
