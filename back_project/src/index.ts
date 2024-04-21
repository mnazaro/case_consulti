import express from 'express';
import empresaRoutes from './routes/EmpresaRoute';
import setorRoutes from './routes/SetorRoute';

const app = express();
app.use(express.json());
app.get('/', (req, res) => { return  res.send('Hello World!')});
app.use('/empresa', empresaRoutes);
app.use('/setor', setorRoutes);

app.listen(3000, () => console.log('Server is running on port 3000'));


