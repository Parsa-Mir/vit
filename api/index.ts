import { Hono } from "hono";
import api from "../src/api";

const app = new Hono();
app.route("/api", api);

export default app.fetch;
