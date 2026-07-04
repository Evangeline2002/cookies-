import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';

export default function AdminLayout() {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      return <Navigate to="/admin" replace />;
    }
  } catch {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 overflow-x-auto">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
