import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllStaff, createStaff, updateStaff, deleteStaff } from '@/services/staffService';
import type { CreateStaffDTO, UpdateStaffDTO, GetAllStaffParams } from '@/types/staff';
import { useState } from 'react';

export function useStaff() {
  const queryClient = useQueryClient();
  const [params, setParams] = useState<GetAllStaffParams>({
  });

  const staffQuery = useQuery({
    queryKey: ['staff', params],
    queryFn: () => getAllStaff(params),
    retry: 1,
    staleTime: 30000, // 30 seconds
  });

  const createMutation = useMutation({
    mutationFn: createStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateStaffDTO }) =>
      updateStaff(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    },
  });

  return {
    staff: staffQuery.data?.data.data ?? [],
    pagination: {
      total: staffQuery.data?.data.totalCount ?? 0,
      page: staffQuery.data?.data.currentPage ?? 1,
      limit: params.limit ?? 10,
      totalPages: staffQuery.data?.data.totalPage ?? 0,
    },
    isLoading: staffQuery.isLoading,
    error: staffQuery.error,
    createStaff: createMutation.mutate,
    updateStaff: updateMutation.mutate,
    deleteStaff: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    setParams,
  };
}
