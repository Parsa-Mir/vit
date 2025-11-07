import { Hono } from "hono";
import { handle } from "hono/vercel";
import api from "../src/api";

const app = new Hono();
app.route("/api", api);

export default handle(app);
