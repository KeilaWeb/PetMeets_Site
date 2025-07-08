import NavbarDashboard from '../../components/Dashboard/Navbar-Dashboard';
import MenuDashboard from '../../components/Dashboard/Menu-Dashboard';
import AgendaImage from '../../img/agenda-google-cores.png';

export function CalendarPage() {
  return (
    <div className="dashboard-page">
      <NavbarDashboard />
      <div className="main-content">
        <MenuDashboard />
        <img style={{ width: '90%', height: '70%', objectFit: 'contain' }} className='calendar' src={AgendaImage} alt="Agenda Google" />
      </div>
    </div>
  );
};

export default CalendarPage;
