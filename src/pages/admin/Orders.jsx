import { useState, useEffect } from 'react';
import { HiOutlineSearch, HiOutlineEye, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { getOrders, updateOrderStatus, deleteOrder } from '../../services/adminService';

const statusColors = {
  Delivered: 'bg-green-100 text-green-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped: 'bg-purple-100 text-purple-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [viewOrder, setViewOrder] = useState(null);

  const fetch = () => {
    setLoading(true);
    getOrders({ search, status: filter === 'All' ? undefined : filter })
      .then(({ data }) => setOrders(data))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, [search, filter]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      toast.success('Order status updated');
      fetch();
    } catch { toast.error('Failed to update status'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this order?')) return;
    try { await deleteOrder(id); toast.success('Order deleted'); fetch(); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Orders</h1>
        <p className="text-gray-400 mt-1">View and manage all orders</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders..." className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#8B4513] focus:ring-2 focus:ring-[#8B4513]/20 outline-none bg-white" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === s ? 'bg-[#8B4513] text-white shadow-lg shadow-[#8B4513]/30' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#8B4513]'}`}>{s}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-[#8B4513] border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-6 py-4 font-semibold text-gray-500">Order ID</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500">Customer</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500">Amount</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500">Payment</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500">Status</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500">Date</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{order.order_number}</td>
                    <td className="px-6 py-4">
                      <p className="text-gray-800 font-medium">{order.customer_name}</p>
                      <p className="text-gray-400 text-xs">{order.customer_email}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">${Number(order.total_amount).toFixed(2)}</td>
                    <td className="px-6 py-4 text-gray-500">{order.payment_method || '-'}</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-lg font-semibold border-0 cursor-pointer ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setViewOrder(order)} className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"><HiOutlineEye className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(order.id)} className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"><HiOutlineTrash className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && <tr><td colSpan="7" className="px-6 py-12 text-center text-gray-400">No orders found</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setViewOrder(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Order {viewOrder.order_number}</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div><p className="text-sm text-gray-400">Customer</p><p className="font-medium">{viewOrder.customer_name}</p></div>
              <div><p className="text-sm text-gray-400">Email</p><p className="font-medium">{viewOrder.customer_email || '-'}</p></div>
              <div><p className="text-sm text-gray-400">Phone</p><p className="font-medium">{viewOrder.customer_phone || '-'}</p></div>
              <div><p className="text-sm text-gray-400">Payment</p><p className="font-medium">{viewOrder.payment_method || '-'}</p></div>
              <div><p className="text-sm text-gray-400">Amount</p><p className="font-medium">${Number(viewOrder.total_amount).toFixed(2)}</p></div>
              <div><p className="text-sm text-gray-400">Status</p><span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[viewOrder.status]}`}>{viewOrder.status}</span></div>
            </div>
            {viewOrder.items && viewOrder.items.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Items</h4>
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-100"><th className="text-left py-2 font-semibold text-gray-500">Product</th><th className="text-right py-2 font-semibold text-gray-500">Qty</th><th className="text-right py-2 font-semibold text-gray-500">Price</th></tr></thead>
                  <tbody>
                    {viewOrder.items.map((item, i) => (
                      <tr key={i} className="border-b border-gray-50"><td className="py-2 text-gray-800">{item.product_name}</td><td className="py-2 text-right text-gray-600">{item.quantity}</td><td className="py-2 text-right text-gray-600">${Number(item.price).toFixed(2)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <button onClick={() => setViewOrder(null)} className="mt-6 w-full py-2.5 rounded-xl bg-[#8B4513] text-white font-semibold hover:bg-[#6e350d] transition-colors">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
