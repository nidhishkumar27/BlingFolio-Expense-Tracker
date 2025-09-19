import Navbar from '../components/Navbar.jsx';
import DashboardSummary from '../components/DashboardSummary.jsx';
import ExpenseForm from '../components/ExpenseForm.jsx';
import ExpenseList from '../components/ExpenseList.jsx';
import Chatbot from '../components/Chatbot.jsx';

export default function AllComponentsPage() {
  return (
    <div>
      <Navbar />
      <h1>All Components (Basic View)</h1>
      <DashboardSummary expenses={[]} />
      <ExpenseForm initial={null} onSave={() => {}} onClose={() => {}} />
      <ExpenseList expenses={[]} onEdit={() => {}} onDelete={() => {}} />
      <Chatbot />
    </div>
  );
}
