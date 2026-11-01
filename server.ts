import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { apiRouter, shortUrlRegistry } from './server/routes';
import { globalAuraXNode } from './server/blockchainNode';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable full CORS for MetaMask extension and Web3 wallets
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  app.use((req, res, next) => {
    if (req.body !== undefined && req.body !== null) {
      if (typeof req.body === 'string') {
        try {
          req.body = JSON.parse(req.body);
        } catch (_) {}
      }
      (req as any)._body = true;
      return next();
    }
    express.json({
      limit: '10mb',
      verify: (req: any, _res, buf) => {
        req.rawBody = buf.toString('utf8');
      }
    })(req, res, next);
  });
  app.use(express.urlencoded({ extended: true }));

  // Mount API router
  app.use('/api', apiRouter);

  // Short URL redirects for clean, high-trust social media links & referral invitations
  app.get('/r/:refCode', (req, res) => {
    const refCode = req.params.refCode;
    const target = shortUrlRegistry[refCode.toLowerCase()];
    if (target) {
      return res.redirect(302, target);
    }
    res.redirect(302, `/?ref=${encodeURIComponent(refCode)}`);
  });

  app.get('/s/:slug', (req, res) => {
    const slug = req.params.slug;
    const target = shortUrlRegistry[slug.toLowerCase()];
    if (target) {
      return res.redirect(302, target);
    }
    res.redirect(302, `/?ref=${encodeURIComponent(slug)}`);
  });

  app.get('/join/:refCode', (req, res) => {
    const refCode = req.params.refCode;
    const target = shortUrlRegistry[refCode.toLowerCase()];
    if (target) {
      return res.redirect(302, target);
    }
    res.redirect(302, `/?ref=${encodeURIComponent(refCode)}`);
  });

  // Enterprise FinOps Health & API Status
  app.get('/api/status', (req, res) => {
    res.json({
      status: 'healthy',
      service: 'ECONOS Commercial FinOps Operating Core',
      version: '2026.1.0'
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ECONOS Engine] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[ECONOS Engine] Failed to start server:', err);
  process.exit(1);
});
