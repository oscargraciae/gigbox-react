const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const admin = require('firebase-admin');

const serviceAccount = require('./config/firebase-server.json');

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://platzimusic-1bf81.firebaseio.com/",
}, 'server');

app.prepare()
.then(() => {
  const server = express();

  server.use((req, res, next) => {
    req.firebaseServer = firebase;
    next();
  });

  server.get('/service/:id', (req, res) => {
    return app.render(req, res, '/service', { id: req.params.id });
  });

  server.get('/u/:id', (req, res) => {
    return app.render(req, res, '/user', { username: req.params.id });
  });

  server.get('/categories/:category/:subcategory?', (req, res) => {
    return app.render(req, res, '/categories', { category: req.params.category, subcategory: req.params.subcategory });
  });

  server.get('/conversation/:id', (req, res) => {
    return app.render(req, res, '/conversation', { username: req.params.id });
  });

  server.get('/services/new', (req, res) => {
    return app.render(req, res, '/serviceNew');
  });

  server.get('/services/edit/:id', (req, res) => {
    return app.render(req, res, '/serviceEdit', { id: req.params.id, params: req.params });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.PORT || 3000);
})
.catch(() => {
  process.exit(1);
});
