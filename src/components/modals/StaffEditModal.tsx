import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStaff } from '@/hooks/useStaff';
import type { Staff, UpdateStaffDTO, CreateStaffDTO } from '@/types/staff';

const staffSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional()
    .or(z.literal('')),
  status: z.enum(['ACTIVE', 'INACTIVE']),
});

type StaffFormData = z.infer<typeof staffSchema>;

interface StaffEditModalProps {
  staff: Staff | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StaffEditModal({ staff, isOpen, onClose }: StaffEditModalProps) {
  const { createStaff, updateStaff, isCreating, isUpdating } = useStaff();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema),
  });

  useEffect(() => {
    if (staff) {
      reset({
        name: staff.name,
        username: staff.username,
        password: '',
        status: staff.status,
      });
    } else {
      reset({
        name: '',
        username: '',
        password: '',
        status: 'ACTIVE',
      });
    }
  }, [staff, reset]);

  const onSubmit = (data: StaffFormData) => {
    const submitData: UpdateStaffDTO = {
      name: data.name,
      username: data.username,
      status: data.status,
    };

    if (data.password && data.password.trim() !== '') {
      submitData.password = data.password;
    }

    if (staff) {
      updateStaff({ id: staff.id, data: submitData });
    } else {
      if (!submitData.password || !submitData.name || !submitData.username) {
        alert('All fields are required when creating a new staff member');
        return;
      }
      const createData: CreateStaffDTO = {
        name: submitData.name,
        username: submitData.username,
        password: submitData.password,
        status: submitData.status || 'ACTIVE',
      };
      createStaff(createData);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#3949ab] font-semibold text-lg">
            {staff ? 'Edit Staff Member' : 'Create Staff Member'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 pb-2 border-b">
              Staff Information
            </h3>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Enter full name"
                  className="w-full h-10"
                />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username *
                </Label>
                <Input
                  id="username"
                  {...register('username')}
                  placeholder="Enter username"
                  className="w-full h-10"
                  disabled={!!staff}
                />
                {errors.username && (
                  <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
                )}
                {staff && <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>}
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password {!staff && '*'}
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  placeholder={staff ? 'Leave blank to keep current password' : 'Enter password'}
                  className="w-full h-10"
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                )}
                {staff && (
                  <p className="text-xs text-gray-500 mt-1">Leave blank to keep current password</p>
                )}
              </div>

              <div>
                <Label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full h-10">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                        <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <p className="text-sm text-red-600 mt-1">{errors.status.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-[#f44336] text-white hover:bg-[#d32f2f] border-[#f44336]"
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              className="flex-1 bg-[#4caf50] hover:bg-[#45a049] text-white"
            >
              {staff ? 'UPDATE' : 'CREATE'} MEMBER
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
