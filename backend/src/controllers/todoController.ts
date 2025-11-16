import { Response } from "express";
import Todo from "../models/Todo";
import { AuthRequest } from "../middlewares/auth";
import { Types } from "mongoose";

const TodoController = {
  async list(req: AuthRequest, res: Response) {
    const userId = req.user._id as Types.ObjectId;
    const todos = await Todo.find({ user: userId }).sort({ createdAt: -1 });
    res.json(todos);
  },

  async create(req: AuthRequest, res: Response) {
    const userId = req.user._id as Types.ObjectId;
    const { title, description, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });

    const todo = await Todo.create({
      user: userId,
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined
    });
    res.status(201).json(todo);
  },

  async getOne(req: AuthRequest, res: Response) {
    const userId = req.user._id as Types.ObjectId;
    const t = await Todo.findOne({ _id: req.params.id, user: userId });
    if (!t) return res.status(404).json({ message: "Not found" });
    res.json(t);
  },

  async update(req: AuthRequest, res: Response) {
    const userId = req.user._id as Types.ObjectId;
    const payload: any = { ...req.body };
    if (payload.dueDate) payload.dueDate = new Date(payload.dueDate);

    const t = await Todo.findOneAndUpdate({ _id: req.params.id, user: userId }, payload, { new: true });
    if (!t) return res.status(404).json({ message: "Not found" });
    res.json(t);
  },

  async remove(req: AuthRequest, res: Response) {
    const userId = req.user._id as Types.ObjectId;
    const t = await Todo.findOneAndDelete({ _id: req.params.id, user: userId });
    if (!t) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  },

  async toggle(req: AuthRequest, res: Response) {
    const userId = req.user._id as Types.ObjectId;
    const todo = await Todo.findOne({ _id: req.params.id, user: userId });
    if (!todo) return res.status(404).json({ message: "Not found" });
    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    res.json(todo);
  }
};

export default TodoController;
