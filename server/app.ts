import express, { Response, Request, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import { rateLimit } from "express-rate-limit";

const app = express();
import cors from "cors";
import msgRouter from "./routes/send";

// Middlewares
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  res.json({
    message: err.message,
  });
});
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.get("/", limiter, (req: Request, res: Response) => {
  res.status(201).json({
    message: "Hello,World!",
  });
});

app.use("/api/v1", limiter, msgRouter);
export default app;
