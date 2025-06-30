import NavbarDashboard from '../../components/Dashboard/Navbar-Dashboard';
import MenuDashboard from '../../components/Dashboard/Menu-Dashboard';
import ListClients from '../../components/Dashboard/List-Clients';
import '../../styles/components/Dashboard/_dashboard.sass';

export function ListClientsPage() {
    return (
        <div className="dashboard-page">
            <NavbarDashboard />
            <div className="main-content">
                <MenuDashboard />
                <ListClients />
            </div>
        </div>
    );
};

export default ListClientsPage;
