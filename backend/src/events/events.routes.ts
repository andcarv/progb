import { Router } from "express";
import * as eventsController from "./events.controller";

const router = Router();
router.get("/api/events", eventsController.getAll);

export default router;
