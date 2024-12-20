import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
const PORT = process.env.PORT || 3001;

// Basic middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

// API Routes
registerRoutes(app);

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error(`Server error: ${err.stack || err}`);
  res.status(status).json({ message });
});

// Create HTTP server
const server = createServer(app);

// Start server
(async () => {
  try {
    // Setup Vite or static files before starting server
    if (process.env.NODE_ENV === "production") {
      serveStatic(app);
    } else {
      await setupVite(app, server);
    }

    // Start listening
    const startServer = () => {
      server.listen(PORT, "0.0.0.0", () => {
        log(`Server started on port ${PORT}`);
      }).on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          log(`Port ${PORT} is in use, trying again...`);
          setTimeout(() => {
            server.close();
            startServer();
          }, 1000);
        } else {
          log(`Error starting server: ${err}`);
          process.exit(1);
        }
      });
    };

    startServer();

    // Graceful shutdown handler
    const handleShutdown = () => {
      server.close(() => {
        log("Server stopped");
        process.exit(0);
      });
    };

    process.on("SIGTERM", handleShutdown);
    process.on("SIGINT", handleShutdown);

  } catch (error) {
    log(`Fatal error starting server: ${error}`);
    process.exit(1);
  }
})();