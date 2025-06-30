import '../../styles/components/Dashboard/_dashboard.sass';
import SelectClient from '../../components/Dashboard/DashboardRoute/ClientsAndPets/SelectClient';

const IntroDashboard = () => {
    return (
        <div className="intro-dashboard">
            <SelectClient />
        </div>
    );
};

export default IntroDashboard;