const bcrypt = require("bcrypt");
const pool = require("../config/database");

async function getAllUser() {
    const [rows] = await pool.query("SELECT * FROM user");
    return rows;
}

async function createUser(name, email, telefone, perfil, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertUser = 'INSERT INTO user (name, email, telefone, perfil, password) VALUES (?, ?, ?, ?, ?)';
    await pool.query(insertUser, [name, email, telefone, perfil, hashedPassword]);
}

async function updateUser(id, name, email, telefone, perfil, password) {
    let query = 'UPDATE user SET name = ?, email = ?, telefone = ?, perfil = ? WHERE id = ?';
    let params = [name, email, telefone, perfil, id];

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        query = 'UPDATE user SET name = ?, email = ?, telefone = ?, perfil = ?, password = ? WHERE id = ?';
        params = [name, email, telefone, perfil, hashedPassword, id];
    }
    await pool.query(query, params);
}

async function deleteUser(id) {
    await pool.query('DELETE FROM user WHERE id = ?', [id]);
}

async function getUserById(id) {
    const [user] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
    return user[0];
}

module.exports = {
    getUserById,
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
};
