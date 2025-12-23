import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const STATS_FILE = path.join(DATA_DIR, 'stats.json');
const DEFAULT_STATS = {
  total: 0,
  pages: {},
  referrers: {},
  lastUpdated: new Date().toISOString()
};

async function ensureStatsFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(STATS_FILE);
  } catch {
    await fs.writeFile(STATS_FILE, JSON.stringify(DEFAULT_STATS, null, 2), 'utf8');
  }
}

async function readStats() {
  try {
    const contents = await fs.readFile(STATS_FILE, 'utf8');
    return JSON.parse(contents);
  } catch {
    return { ...DEFAULT_STATS };
  }
}

async function writeStats(stats) {
  await fs.writeFile(STATS_FILE, JSON.stringify(stats, null, 2), 'utf8');
}

await ensureStatsFile();
let stats = await readStats();

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.get('/', (_req, res) => {
  res.redirect('/analytics/dashboard');
});

app.get('/health', (_req, res) => {
  res.send('ok');
});

app.get('/analytics.js', (_req, res) => {
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.sendFile(path.join(__dirname, 'script.js'));
});

app.post('/track', async (req, res) => {
  const { path: pagePath = '/', referrer, title } = req.body ?? {};
  const timestamp = new Date().toISOString();
  stats.total += 1;
  stats.pages[pagePath] = (stats.pages[pagePath] ?? 0) + 1;
  if (referrer) {
    stats.referrers[referrer] = (stats.referrers[referrer] ?? 0) + 1;
  }
  stats.lastUpdated = timestamp;
  await writeStats(stats).catch((error) => {
    console.warn('Failed to persist analytics data:', error.message);
  });
  res.sendStatus(204);
});

app.get('/stats', (_req, res) => {
  res.json(stats);
});

app.get('/analytics/dashboard', (_req, res) => {
  const rows = Object.entries(stats.pages)
    .map(
      ([page, count]) =>
        `<tr><td><code>${page}</code></td><td style="text-align:right;">${count}</td></tr>`
    )
    .join('');
  const referrers = Object.entries(stats.referrers)
    .map(
      ([referrer, count]) =>
        `<tr><td><code>${referrer}</code></td><td style="text-align:right;">${count}</td></tr>`
    )
    .join('');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`
    <html>
      <head>
        <title>Analytics dashboard</title>
        <style>
          body { font-family: system-ui, sans-serif; background:#0b1020; color:#f8fafc; padding:2rem; }
          table { width:100%; border-collapse:collapse; margin-bottom:2rem; }
          td { border-bottom:1px solid rgba(255,255,255,0.1); padding:0.4rem 0.5rem; }
          code { color:#38bdf8; }
          h1,h2 { margin-bottom:0.5rem; }
        </style>
      </head>
      <body>
        <h1>Analytics</h1>
        <p>Total events: ${stats.total}</p>
        <p>Última actualización: ${stats.lastUpdated}</p>
        <section>
          <h2>Más visitadas</h2>
          <table>
            <thead>
              <tr><th>Ruta</th><th>#</th></tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </section>
        <section>
          <h2>Referencias</h2>
          <table>
            <thead>
              <tr><th>Referrer</th><th>#</th></tr>
            </thead>
            <tbody>
              ${referrers}
            </tbody>
          </table>
        </section>
      </body>
    </html>
  `);
});

const PORT = Number(process.env.ANALYTICS_PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Analytics tracker listening on ${PORT}`);
});
