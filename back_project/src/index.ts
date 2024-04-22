import empresaRoutes from './routes/EmpresaRoute';
import setorRoutes from './routes/SetorRoute';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/empresa', empresaRoutes);
app.use('/setor', setorRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});


