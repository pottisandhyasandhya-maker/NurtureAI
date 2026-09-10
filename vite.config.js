import { defineConfig } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';

export default defineConfig({
  plugins: [
    {
      name: 'daily-care-navigation',
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          const requestPath = request.url?.split('?')[0] || '';
          if (!requestPath.endsWith('/code.html')) return next();

          const filePath = path.join(process.cwd(), decodeURIComponent(requestPath));
          try {
            let html = await fs.readFile(filePath, 'utf8');
            html = html.replace('</head>', '<script src="/navigation.js"></script></head>');
            response.setHeader('Content-Type', 'text/html');
            response.end(html);
          } catch {
            next();
          }
        });
      }
    }
  ]
});
