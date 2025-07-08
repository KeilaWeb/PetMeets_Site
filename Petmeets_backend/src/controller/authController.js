// authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../config/database");
const JWT_SECRET = "chaveSecretaSuperSegura";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "8h"
    });

    res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        perfil: user.perfil,
        telefone: user.telefone
      }
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};


module.exports = { login };