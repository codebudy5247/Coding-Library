import express from 'express';
import CatalogRouter from './api/catalog.routes';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', CatalogRouter);

export default app;