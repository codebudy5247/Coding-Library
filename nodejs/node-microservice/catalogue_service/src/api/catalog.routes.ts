import express, { Request, Response } from 'express';

const router = express.Router();


// Get all products
router.get('/products', (req: Request, res: Response) => {
    res.status(200).json({products: []});
});

// Get a single product by ID
router.get('/products/:id', (req: Request, res: Response) => {
    res.status(200).json({});
});

// Add a new product
router.post('/product', (req: Request, res: Response) => {
    res.status(201).json({});
});

// Update an existing product
router.put('/products/:id', (req: Request, res: Response) => {
    res.status(200).json({});
});

// Delete a product
router.delete('/products/:id', (req: Request, res: Response) => {
    res.status(204).json({});
});

export default router;