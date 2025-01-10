'use client'

import { useStoreModal } from "@/hooks/use-store-modal"
import Modal from "../ui/modal"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1),
})

export const StoreModal = () => {
    const [loading, setLoading] = useState(false);

    const storeModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/stores', values);
            console.log(response.data);
            toast.success("Success add new store!")
            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            toast.error('Failed add store!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal title="Add Store" description="Add new store to create a product and category" isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name='name' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter store name" {...field} disabled={loading}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <div  className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>Cancel</Button>
                                <Button type="submit" disabled={loading}>Continue</Button>
                            </div>
                        </form>

                    </Form>
                </div>
            </div>
        </Modal>
    )
}