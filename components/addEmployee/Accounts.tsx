"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Calendar } from "@/components/ui/calendar";

import { format } from "date-fns";
import { FaCalendar } from "react-icons/fa";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  email: z.string().email({ message: "Please add a valid email" }),

  slack: z.string(),
});

export default function ProfessionalData() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      slack: "",
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
        <div className="grid grid-cols-2 gap-x-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="NDT Email Address"
                    {...field}
                    className="w-full rounded-xl"
                  />
                </FormControl>

                <FormMessage color="text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slack"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Slack Username"
                    {...field}
                    className="w-full rounded-xl"
                  />
                </FormControl>

                <FormMessage color="text-red-600" />
              </FormItem>
            )}
          />
        </div>

        <Button variant={"outline"}>Cancel</Button>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
