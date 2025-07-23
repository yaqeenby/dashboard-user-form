const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('mock/db.json');
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ JSON Server with CORS is running at http://localhost:${PORT}`);
});
