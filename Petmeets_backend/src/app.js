const express = require("express");
const cors = require("cors");
const app = express();

const userRoutes = require("./router/userRoutes");
const clientRoutes = require('./router/clientPetRoutes');
const authRoutes = require("./router/authRoutes");

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);      // para rotas de usuário
app.use('/auth', authRoutes);          // para login
app.use('/clients', clientRoutes);     // para cliente/pet

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
