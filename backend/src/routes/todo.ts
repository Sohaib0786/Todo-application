import { Router } from "express";
import auth from "../middlewares/auth";
//import TodoController from "../controllers/todoController";
import TodoController from "../controllers/todoController";

const router = Router();

// Protect all todo routes
router.use(auth);

router.get("/", TodoController.list);
router.post("/", TodoController.create);
router.get("/:id", TodoController.getOne);
router.put("/:id", TodoController.update);
router.delete("/:id", TodoController.remove);
router.patch("/:id/toggle", TodoController.toggle);

export default router;
