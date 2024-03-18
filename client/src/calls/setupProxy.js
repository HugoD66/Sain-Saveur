import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4700",
      changeOrigin: true,
    }),
  );

  app.use(
    "/redis",
    createProxyMiddleware({
      target: "http://localhost:6380",
      changeOrigin: true,
    }),
  );
}
