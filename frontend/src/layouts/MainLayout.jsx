import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-80 flex-shrink-0 sticky top-0 h-screen overflow-hidden">
        <Sidebar />
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
