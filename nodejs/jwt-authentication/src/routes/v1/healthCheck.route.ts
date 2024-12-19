import { Router, Request, Response } from "express";

const healthCheckRoutes: Router = Router();

healthCheckRoutes.get("/", (req: Request, res: Response) => {
  res.json({ ok: true });
});
healthCheckRoutes.get("/message/:name", (req, res) => {
  res.json({ message: `hello ${req.params.name}` });
});
export default healthCheckRoutes;
