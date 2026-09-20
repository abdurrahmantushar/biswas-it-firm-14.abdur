
import express from 'express'
import cors from 'cors'
import dns from 'dns'

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import { ConnectDB } from './config/db.js';
import authMiddleware from './middleware/authMiddleware.js';


export const app = express ()

dns.setServers ([
    "1.1.1.1",
    "8.8.8.8"
])


const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.get('/',(req,res)=>{
    res.json({
        message: 'Source-X API is running',
    })
})

app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

app.use('/auth',authRoutes)
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/requests", requestRoutes);
app.use("/categories", categoryRoutes);

ConnectDB()
