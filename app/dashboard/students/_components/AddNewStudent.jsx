'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { Loader2Icon } from 'lucide-react';

function AddNewStudent({refreshData}) {
    const [open, setOpen] = useState(false);
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingGrades, setLoadingGrades] = useState(false); // For loading state of grades
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        GetAllGradesList();
    }, []);
    

    const GetAllGradesList = async () => {
        setLoadingGrades(true);
        try {
            const resp = await GlobalApi.GetAllGrades();
            setGrades(resp.data);
        } catch (error) {
            toast.error("Failed to fetch grades");
        } finally {
            setLoadingGrades(false);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const resp = await GlobalApi.CreateNewStudent(data);
            if (resp.data) {
                reset();
                refreshData();
                setOpen(false);
                toast('New Student Added');
            }
        } catch (error) {
            toast.error("Failed to add new student");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                    </DialogHeader>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="py-3">
                                <label>Full Name</label>
                                <Input
                                    placeholder="Write your full name"
                                    {...register('name', { required: "Full name is required" })}
                                />
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            </div>
                            <div className="flex flex-col py-2">
                                <label>Select Grade</label>
                                {loadingGrades ? (
                                    <p>Loading grades...</p>
                                ) : (
                                    <select
                                        className="p-3 border rounded-lg"
                                        {...register('grade', { required: "Grade is required" })}
                                    >
                                        <option value="">Оберіть об'єкт для роботи</option>
                                        <option value="5th">5th</option>
                                        <option value="6th">6th</option>
                                        <option value="7th">7th</option>   
                                    </select>


                                )}
                                {errors.grade && <span className="text-red-500">{errors.grade.message}</span>}
                            </div>
                            <div className="py-3">
                                <label>Contact Number</label>
                                <Input
                                    type="number"
                                    placeholder="Write your contact"
                                    {...register('contact')}
                                />
                            </div>
                            <div className="py-3">
                                <label>Address</label>
                                <Input
                                    placeholder="Write your address"
                                    {...register('address')}
                                />
                            </div>

                            <div className="flex gap-3 items-center justify-end mt-5">
                                <Button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    variant="ghost"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? <Loader2Icon className="animate-spin" /> : 'Save'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewStudent
