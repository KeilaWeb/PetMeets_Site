import React, { useEffect, useState } from 'react';
import '../../styles/components/Dashboard/_dashboard.sass';
import doutora from '../../img/doutora.jpg';

const MenuDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/'; // ou redirecione para a página de login
  };

  return (
    <div className="menu-dashboard linha-embaixo">
      <div className="user-info">
        <img src={doutora} alt="Doctor" className="user-photo" />
        <div>
          <p>Olá, {user?.name || 'Usuário'}</p>
          <button onClick={handleLogout}>Sair</button>
        </div>
      </div>
      <button className="edit-profile">Editar Perfil</button>
    </div>
  );
};

export default MenuDashboard;
