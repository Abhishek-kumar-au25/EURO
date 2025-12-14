'use client';
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { staff } from "@/lib/data";
import { StaffTable } from "@/components/staff/staff-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { Staff } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function StaffPage() {
    const [staffList, setStaffList] = useState<Staff[]>(staff);
    const [newStaff, setNewStaff] = useState({ name: '', email: '', role: 'Support' });
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
    const { toast } = useToast();

    const handleSaveStaff = () => {
        if (newStaff.name && newStaff.email) {
          const newStaffData: Staff = {
            id: `STAFF${(staffList.length + 1).toString().padStart(3, '0')}`,
            name: newStaff.name,
            email: newStaff.email,
            role: newStaff.role as 'Admin' | 'Manager' | 'Support',
            avatarUrl: `https://picsum.photos/seed/st${staffList.length + 1}/200/200`,
            status: 'Active',
            joinDate: new Date().toISOString(),
            permissions: newStaff.role === 'Admin' ? ['All'] : ['View Rides'],
          };
          setStaffList([...staffList, newStaffData]);
          toast({ title: "Staff Added", description: `${newStaff.name} has been added.` });
          setNewStaff({ name: '', email: '', role: 'Support' });
          setIsAddDialogOpen(false);
        }
      };

    const handleEditStaff = (staff: Staff) => {
        setEditingStaff(staff);
        setIsEditDialogOpen(true);
    }

    const handleUpdateStaff = () => {
        if (editingStaff) {
            setStaffList(staffList.map(s => s.id === editingStaff.id ? editingStaff : s));
            toast({ title: "Staff Updated", description: `${editingStaff.name}'s details have been updated.` });
            setEditingStaff(null);
            setIsEditDialogOpen(false);
        }
    }


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Staff Management"
        description="Manage admin users and permissions."
      />
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Input placeholder="Search by name or email..." className="w-full md:flex-1" />
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="w-1/2 md:w-auto">
                SEARCH
              </Button>
              <Button variant="ghost" className="w-1/2 md:w-auto">
                RESET
              </Button>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                 <Button className="w-full md:w-auto">ADD STAFF</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Staff Member</DialogTitle>
                  <DialogDescription>
                    Fill in the details to add a new staff member.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" value={newStaff.name} onChange={(e) => setNewStaff({...newStaff, name: e.target.value})} className="col-span-3" />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" type="email" value={newStaff.email} onChange={(e) => setNewStaff({...newStaff, email: e.target.value})} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Select value={newStaff.role} onValueChange={(value) => setNewStaff({...newStaff, role: value})}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Support">Support</SelectItem>
                            <SelectItem value="Manager">Manager</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                  <Button onClick={handleSaveStaff}>Save Staff</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
      <StaffTable staff={staffList} onEdit={handleEditStaff} />

       {editingStaff && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit Staff Member</DialogTitle>
                <DialogDescription>
                Update the details for {editingStaff.name}.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                    Name
                </Label>
                <Input id="edit-name" value={editingStaff.name} onChange={(e) => setEditingStaff({...editingStaff, name: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                    Email
                </Label>
                <Input id="edit-email" type="email" value={editingStaff.email} onChange={(e) => setEditingStaff({...editingStaff, email: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                    Role
                </Label>
                <Select value={editingStaff.role} onValueChange={(value) => setEditingStaff({...editingStaff, role: value as Staff['role']})}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Support">Support</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleUpdateStaff}>Save Changes</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
       )}

    </div>
  );
}
