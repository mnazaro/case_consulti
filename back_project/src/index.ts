import express from 'express';
import empresaRoutes from './routes/EmpresaRoute';
import setorRoutes from './routes/SetorRoute';

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/empresa', empresaRoutes);
app.use('/setor', setorRoutes);

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 5000,
}, () => {
  console.log('HTTP Server Running');
});
