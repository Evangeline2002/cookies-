import { useState, useEffect } from 'react';
import { HiOutlineShoppingBag, HiOutlineClipboardList, HiOutlineUsers, HiOutlineCurrencyDollar, HiOutlineStar } from 'react-icons/hi';
import SummaryCard from '../../components/admin/SummaryCard';
import { getDashboardStats } from '../../services/adminService';

const statusColors = {
  Delivered: 'bg-green-100 text-green-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped: 'bg-purple-100 text-purple-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(({ data }) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#8B4513] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const summaryData = [
    { title: 'Total Products', value: stats?.totalProducts ?? 0, icon: HiOutlineShoppingBag, trend: null },
    { title: 'Total Orders', value: stats?.totalOrders ?? 0, icon: HiOutlineClipboardList, trend: null },
    { title: 'Total Customers', value: stats?.totalCustomers ?? 0, icon: HiOutlineUsers, trend: null },
    { title: 'Total Revenue', value: `$${Number(stats?.totalRevenue ?? 0).toLocaleString()}`, icon: HiOutlineCurrencyDollar, trend: null },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryData.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 font-semibold text-gray-500">Order</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500">Customer</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500">Amount</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {(stats?.recentOrders ?? []).map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{order.order_number}</td>
                    <td className="px-6 py-4 text-gray-600">{order.customer_name}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">${Number(order.total_amount).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {(stats?.recentOrders ?? []).length === 0 && (
                  <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-400">No orders yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Customers */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Recent Customers</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {(stats?.recentCustomers ?? []).map((customer) => (
              <div key={customer.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium text-gray-800">{customer.name}</p>
                  <p className="text-sm text-gray-400">{customer.email}</p>
                </div>
                <span className="text-xs text-gray-400">{customer.total_orders} orders</span>
              </div>
            ))}
            {(stats?.recentCustomers ?? []).length === 0 && (
              <div className="px-6 py-12 text-center text-gray-400">No customers yet</div>
            )}
          </div>
        </div>

        {/* Latest Reviews */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm lg:col-span-2">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Latest Reviews</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {(stats?.latestReviews ?? []).map((review) => (
              <div key={review.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800">{review.customer_name}</p>
                  <p className="text-sm text-gray-400 truncate">{review.comment}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <HiOutlineStar key={i} className={`w-4 h-4 ${i < review.rating ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${review.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {review.status}
                  </span>
                </div>
              </div>
            ))}
            {(stats?.latestReviews ?? []).length === 0 && (
              <div className="px-6 py-12 text-center text-gray-400">No reviews yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
