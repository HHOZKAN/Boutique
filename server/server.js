import express from 'express';
import cors from 'cors'; 
import Products from './data/Products.js';
import dotenv from 'dotenv';
import connectDatabase from './config/MongoDb.js';
import ImportData from './DataImport.js';
import coursRoute from './Routes/CoursRoutes.js';
import { errorHandler, notFound } from './Middleware/Error.js';
import userRoute from './Routes/UserRoutes.js';

dotenv.config();

connectDatabase();
const app = express();
app.use(express.json());

// CORS GERE LES REQUETES ENTRE LE FRONT ET LE BACK
app.use(cors()); 

// API
app.use('/api/import', ImportData);
app.use("/api/Products", coursRoute);
app.use("/api/users", userRoute);

// ERROR HANDLER MIDDLEWARES
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, console.log("Server is running on port" , PORT));