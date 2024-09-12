import express from 'express';
const cors = require('cors');
const dotenv = require('dotenv')
import adminRouters from "./routes/adminRouters"
import instituitionRoutes from "./routes/instituitionRoutes"
import path from 'path';

const app = express();

dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use('/images', express.static(path.join(__dirname, './images')));
app.use('/admin', adminRouters)
app.use('/institution', instituitionRoutes)

app.listen(3000, () => {
    console.log('Aplicação executando na porta 3000')
})