import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    }),
  );

  app.use(
    "/api/redis",
    createProxyMiddleware({
      target: "http://localhost:6380", // Supposons que c'est votre autre service
      changeOrigin: true,
    }),
  );
}
