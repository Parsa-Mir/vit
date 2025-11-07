import { serve } from "bun";
import index from "./index.html";
import { Hono } from "hono";
import api from "./api";

const app = new Hono();
app.route("/api", api);

const server = serve({
  routes: {
    "/api/*": false,
    "/*": index,
  },

  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname.startsWith("/api")) {
      return app.fetch(req);
    }
    return new Response("Not Found", { status: 404 });
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
  port: 3002,
});

console.log(`🚀 Server running at ${server.url}`);
