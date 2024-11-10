'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { User } from '@/types/user';

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingUsers: 0,
    blockedUsers: 0
  });

  useEffect(() => {
    // Mock data - thay thế bằng API call thực tế
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'user1@example.com',
        name: 'Nguyễn Văn A',
        role: 'user',
        companyName: 'Công ty A',
        phone: '0123456789',
        createdAt: new Date(),
        status: 'active'
      },
      // Thêm users khác...
    ];

    setUsers(mockUsers);
    setStats({
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.filter(u => u.status === 'active').length,
      pendingUsers: mockUsers.filter(u => u.status === 'pending').length,
      blockedUsers: mockUsers.filter(u => u.status === 'blocked').length
    });
    setIsLoading(false);
  }, []);

  const handleStatusChange = async (userId: string, newStatus: User['status']) => {
    // Thêm API call cập nhật status
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400">Tổng số user</h3>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400">Đang hoạt động</h3>
          <p className="text-2xl font-bold text-green-500">{stats.activeUsers}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400">Chờ duyệt</h3>
          <p className="text-2xl font-bold text-yellow-500">{stats.pendingUsers}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400">Đã khóa</h3>
          <p className="text-2xl font-bold text-red-500">{stats.blockedUsers}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Ngày đăng ký</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-400">{user.companyName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${user.status === 'active' ? 'bg-green-100 text-green-800' : 
                      user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user.id, e.target.value as User['status'])}
                    className="bg-gray-700 border border-gray-600 rounded px-2 py-1"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 