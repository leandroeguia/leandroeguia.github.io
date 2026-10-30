import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../out/", import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    const segments = pathname.split("/").filter(Boolean);
    if (
      segments.some((part) => part.startsWith(".")) ||
      segments.some((part) =>
        ["node_modules", "scripts", "test-results"].includes(part),
      )
    ) {
      response.writeHead(404).end("Not found");
      return;
    }
    let path = resolve(root, `.${pathname}`);
    const withinRoot = relative(root, path);
    if (withinRoot === ".." || withinRoot.startsWith(`..${sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    if ((await stat(path)).isDirectory()) path = resolve(path, "index.html");
    const body = await readFile(path);
    response.writeHead(200, {
      "Content-Type": types[extname(path)] || "application/octet-stream",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    response.writeHead(
      error.code === "ENOENT" || error.code === "ENOTDIR" ? 404 : 400,
    );
    response.end("Not found");
  }
});

server.on("error", (error) => {
  console.error(
    error.code === "EADDRINUSE"
      ? `Port ${port} is in use. Try setting PORT to another number.`
      : error.message,
  );
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Portfolio ready at http://localhost:${port}`),
);
