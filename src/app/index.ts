import express from 'express';
import cors from 'cors';
import { errorHandler } from '../middlewares/errorHandler';

import itemRoutes from '../routes/itemRoutes';
import countryRoutes from '../routes/countryRoutes';
import paymonthRoutes from '../routes/paymonthRoutes';
import contactRoutes from '../routes/contactRoutes';

const app = express();
app.use(cors({
  origin: true 
  // ['http://localhost:3001', 'http://127.0.0.1:5173']
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/items', itemRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/paymonths', paymonthRoutes);
app.use('/api/contacts', contactRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);
export default app;