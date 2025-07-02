import NavbarDashboard from '../../components/Dashboard/Navbar-Dashboard';
import MenuDashboard from '../../components/Dashboard/Menu-Dashboard';
import EditClient from '../../components/Dashboard/EditClient';
import '../../styles/components/Dashboard/_dashboard.sass';

export function EditClientPage() {
  return (
    <div className="dashboard-page">
      <NavbarDashboard />
      <div className="main-content">
        <MenuDashboard />
        <EditClient />
      </div>
    </div>
  );
};

export default EditClientPage;
