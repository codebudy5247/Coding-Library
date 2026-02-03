import { Router } from 'express';
import { getMovies, getMovieById, searchMovies } from '../controllers/movie.controller';

const router: Router = Router();

router.get('/', getMovies);
router.get('/search', searchMovies);
router.get('/:id', getMovieById);

export default router;
