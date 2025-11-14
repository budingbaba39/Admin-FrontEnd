'use client';

import { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useStaff } from '@/hooks/useStaff';
import { useAppSelector } from '@/store/hooks';
import StaffEditModal from '@/components/modals/StaffEditModal';
import type { Staff } from '@/types/staff';

export default function StaffListClient() {
  const { staff: fetchedStaff, isLoading: isFetching, deleteStaff } = useStaff();
  const { staff: preloadedStaff, isLoaded } = useAppSelector(state => state.preload);

  // Use preloaded data if available, otherwise use fetched data
  const staff = isLoaded && preloadedStaff.length > 0 ? preloadedStaff : fetchedStaff;
  const isLoading = !isLoaded && isFetching;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Client-side filtering - no backend query
  const filteredStaff = useMemo(() => {
    if (!searchTerm.trim()) return staff;

    const searchLower = searchTerm.toLowerCase();
    return staff.filter(
      s =>
        s.name.toLowerCase().includes(searchLower) || s.username.toLowerCase().includes(searchLower)
    );
  }, [staff, searchTerm]);

  const handleEdit = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedStaff(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
      deleteStaff(id);
      toast.success('Staff member deleted successfully');
    }
  };

  // Helper function to get staff name by ID (use full staff list, not filtered)
  const getStaffNameById = (staffId?: number) => {
    if (!staffId) return '-';
    const foundStaff = staff.find(s => s.id === staffId);
    return foundStaff?.name || '-';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-[#e5dbdb] dark:border-gray-700 p-4 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#171212] dark:text-white">Staff Management</h2>
          <Button
            onClick={handleCreate}
            className="bg-[rgba(253,14,14,1)] hover:bg-[#e00c0c] text-white h-9 text-sm font-semibold px-6"
          >
            <Plus className="mr-2 h-4 w-4" />
            CREATE
          </Button>
        </div>

        {/* Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input
            placeholder="Search by name or username..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="h-9"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-[#e5dbdb] dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
              <TableRow>
                <TableHead className="px-3 py-2 text-left text-xs font-semibold text-gray-900 dark:text-gray-200 uppercase">
                  Name
                </TableHead>
                <TableHead className="px-3 py-2 text-left text-xs font-semibold text-gray-900 dark:text-gray-200 uppercase">
                  Username
                </TableHead>
                <TableHead className="px-3 py-2 text-left text-xs font-semibold text-gray-900 dark:text-gray-200 uppercase">
                  Password
                </TableHead>
                <TableHead className="px-3 py-2 text-left text-xs font-semibold text-gray-900 dark:text-gray-200 uppercase">
                  Role
                </TableHead>
                <TableHead className="px-3 py-2 text-left text-xs font-semibold text-gray-900 dark:text-gray-200 uppercase">
                  Created By
                </TableHead>
                <TableHead className="px-3 py-2 text-left text-xs font-semibold text-gray-900 dark:text-gray-200 uppercase">
                  Status
                </TableHead>
                <TableHead className="px-3 py-2 text-right text-xs font-semibold text-gray-900 dark:text-gray-200 uppercase">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
              {filteredStaff.map(staffMember => (
                <TableRow key={staffMember.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <TableCell className="px-3 py-2 font-medium text-gray-900 dark:text-gray-200 text-xs">
                    {staffMember.name}
                  </TableCell>
                  <TableCell className="px-3 py-2 text-gray-900 dark:text-gray-300 text-xs">
                    {staffMember.username}
                  </TableCell>
                  <TableCell className="px-3 py-2 text-gray-900 dark:text-gray-300 text-xs">
                    {staffMember.password || '-'}
                  </TableCell>
                  <TableCell className="px-3 py-2 text-gray-900 dark:text-gray-300 text-xs">
                    <span className="text-gray-400 italic">Upcoming</span>
                  </TableCell>
                  <TableCell className="px-3 py-2 text-gray-900 dark:text-gray-300 text-xs">
                    {getStaffNameById(staffMember.created_by_staff_id)}
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <Badge
                      className={`${
                        staffMember.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      } text-xs font-semibold px-2 py-0.5`}
                    >
                      {staffMember.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-3 py-2 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(staffMember)}
                        className="h-8 w-8 p-0"
                      >
                        <Pencil className="h-4 w-4 text-[#3949ab]" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(staffMember.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal */}
      <StaffEditModal
        staff={selectedStaff}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
