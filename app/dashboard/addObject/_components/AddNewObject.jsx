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


function AddNewObject({refreshData}) {
    const [open, setOpen] = useState(false);
    const [objects, setObjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingObjects, setLoadingObjects] = useState(false); 
    const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
        } = useForm();

        useEffect(() => {
                GetAllObjects();
            }, []);

    const GetAllObjects = async () => {
            setLoadingObjects(true);
            try {
                const resp = await GlobalApi.GetObjects();
                setObjects(resp.data);
            } catch (error) {
                toast.error("Failed to fetch objects");
                console.log(error);
            } finally {
                setLoadingObjects(false);
            }
        };

         const onSubmit = async (data) => {
                setLoading(true);
                try {
                    const resp = await GlobalApi.AddObject(data);
                    if (resp.data) {
                        reset();
                        refreshData();
                        setOpen(false);
                        toast('New Object Added');
                    }
                } catch (error) {
                    toast.error("Failed to add new object");
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };
    
  return (
    <div>
            <Button onClick={() => setOpen(true)}>Добавити новий об'єкт</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Добавити новий об'єкт</DialogTitle>
                    </DialogHeader>
                    <DialogDescription id="dialog-description">
        Заповніть форму нижче, щоб додати новий об'єкт.
    </DialogDescription>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="py-3">
                                <label>Назва об'єкту</label>
                                <Input
                                    placeholder="Напишіть назву об'єкту"
                                    {...register('name', { required: "Full name is required" })}
                                />
                                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            </div>
                            <div className="py-3">
                                <label>Контакти</label>
                                <Input
                                    type="number"
                                    placeholder="Напишіть контакт"
                                    {...register('contact')}
                                />
                            </div>
                            <div className="py-3">
                                <label>Адреса</label>
                                <Input
                                    placeholder="Напишіть адресу"
                                    {...register('address')}
                                />
                            </div>
                            <div className="flex gap-3 items-center justify-end mt-5">
                                <Button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    variant="ghost"
                                >
                                    Вийти
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
  )
}

export default AddNewObject