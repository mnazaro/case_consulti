import express from 'express';
import cors from 'cors';
import empresaRoutes from './routes/EmpresaRoute';
import setorRoutes from './routes/SetorRoute';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/empresa', empresaRoutes);
app.use('/setor', setorRoutes);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(5000, '0.0.0.0', () => {
    console.log('Server is running on port 5000');
});

