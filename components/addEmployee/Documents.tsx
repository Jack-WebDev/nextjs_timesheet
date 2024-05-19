"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";





import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";

const formSchema = z.object({
  employeeType: z.string(),
  email: z.string().email({ message: "Please add a valid email" }),
  startDate: z.coerce.date({
    message: "Please add a start date.",
  }),
  department: z.string(),
  role: z.string(),
  location: z.string(),
});

export default function ProfessionalData() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeType: "",
      email: "",
      department: "",
      role: "",
      location: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="file" {...field} />{" "}
              </FormControl>

              <FormMessage color="text-red-600" />
            </FormItem>
          )}
        />

        <Button variant={"outline"}>Cancel</Button>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
