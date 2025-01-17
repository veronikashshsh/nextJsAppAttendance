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
import { OBJECTS } from '@/utilis/schema';

function AddNewStudent({refreshData}) {
    const [open, setOpen] = useState(false);
    const [objects, setObjects] = useState([]);
    const [selectedObject, setSelectedObject] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingObjects, setLoadingObjects] = useState(false); // For loading state of grades
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        GetAllObjectsList();
    }, []);

    useEffect(() => {
        const fetchObjects = async () => {
            try {
                const response = await fetch("/api/object");
                const data = await response.json();
                setObjects(data);
            } catch (error) {
                console.error("Error fetching objects:", error);
            }
        };

        fetchObjects();
    }, []);
    

    const GetAllObjectsList = async () => {
        setLoadingObjects(true);
        try {
            const resp = await GlobalApi.GetObjects();
            setObjects(resp.data);
        } catch (error) {
            toast.error("Failed to fetch objects");
        } finally {
            setLoadingObjects(false);
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
                                <label>Select Object</label>
                                {loadingObjects ? (
                                    <p>Loading objects...</p>
                                ) : (
                                   
                                    /*<select
                                    className="p-3 border rounded-lg"
                                    {...register('object', { required: true })} // Реєструємо обране значення
                                >
                                     <option value="">Оберіть об'єкт для роботи</option>
                        {objects.map((name) => (
                            <option key={OBJECTS} value={OBJECTS.name}>{OBJECTS.name}</option>
                                    ))}
                                </select>*/

                                <select  className="p-3 border rounded-lg" {...register('object', { required: true })}
                                id="objectSelector"
                                value={selectedObject}
                                onChange={(e) => setSelectedObject(e.target.value)}
                            >
                                <option value="">Оберіть об'єкт</option>
                                {objects.map((object) => (
                                    <option key={object.id} value={object.name}>
                                        {object.name}
                                    </option>
                                ))}
                            </select>

                                )}
                                {errors.object && <span className="text-red-500">{errors.object.message}</span>}
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
