import React from 'react'

function addNewObject() {
  return (
    <div>
            <Button onClick={() => setOpen(true)}>Добавити новий об'єкт</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Добавити новий об'єкт</DialogTitle>
                    </DialogHeader>
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

export default addNewObject