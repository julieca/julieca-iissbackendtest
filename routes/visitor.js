import {
  Router
} from 'express';
import VisitorController from '../controllers/visitor';
const router = new Router();

router.route('/')
  .get(VisitorController.getAll)
  .post(VisitorController.add);

router.route('/:id')
  .get(VisitorController.getById)
  .put(VisitorController.present)
  .delete(VisitorController.remove);

export default router;