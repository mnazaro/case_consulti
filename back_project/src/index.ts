import express from 'express';
import empresaRoutes from './routes/EmpresaRoute';
import setorRoutes from './routes/SetorRoute';

const app = express();

app.use(express.json());
app.use('/empresa', empresaRoutes);
app.use('/setor', setorRoutes);

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
}, () => {
  console.log('HTTP Server Running');
});
