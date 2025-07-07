import NavbarDashboard from '../../components/Dashboard/Navbar-Dashboard';
import MenuDashboard from '../../components/Dashboard/Menu-Dashboard';
import ClientProfile from '../../components/Dashboard/DashboardRoute/ClientsAndPets/ClientProfile';

export function ClientProfilePage() {
  return (
    <div className="dashboard-page">
      <NavbarDashboard />
      <div className="main-content">
        <MenuDashboard />
        <ClientProfile />
      </div>
    </div>
  );
};

export default ClientProfilePage;
