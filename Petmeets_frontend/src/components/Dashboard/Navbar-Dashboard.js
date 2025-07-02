import React from 'react';
import { Link } from 'react-router-dom';
import logovertical from '../../img/logo-petmeets-vertical.png'
import '../../styles/components/Dashboard/_dashboard.sass';

const NavbarDashboard = () => {
    return (
        <div className="navbar-dashboard">
            <div>
                <Link to="/dashboard">
                    <img alt="Logo PetMeets" loading="lazy" width="220" height="48" decoding="async" src={logovertical} className="logo-nav" />
                </Link>
            </div>
            <div className="nav-links">
                <Link to="/register-client">Registrar Cliente</Link>
                <Link to="/clients">Todos os clientes</Link>
                <Link to="/register-product">Cadastrar Produto</Link>
                <Link to="/reports">Painel de Relatório</Link>
                <Link to="/register-service">Cadastrar Serviços</Link>
            </div>
            <div className="call-pet">
                <Link to="">Falar com PetMeets</Link>
            </div>
        </div>
    );
};

export default NavbarDashboard;