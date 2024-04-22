import empresaRoutes from './routes/EmpresaRoute';
import setorRoutes from './routes/SetorRoute';

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use('/empresa', empresaRoutes);
app.use('/setor', setorRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});


