import { Hono } from "hono";

const api = new Hono();

api.get("/hello", (c) => {
  return c.json({
    message: "Hello, world!",
    method: "GET",
  });
});

api.put("/hello", (c) => {
  return c.json({
    message: "Hello, world!",
    method: "PUT",
  });
});

api.get("/hello/:name", (c) => {
  const name = c.req.param("name");
  return c.json({ message: `Hello, ${name}!` });
});

export default api;
