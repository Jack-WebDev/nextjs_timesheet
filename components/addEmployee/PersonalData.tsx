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
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  mobileNumber: z
    .string()
    .min(10, {
      message: "Mobile Number must have 10 digits.",
    })
    .max(10, {
      message: "Mobile Number must have 10 digits.",
    }),
  email: z.string().email({ message: "Please add a valid email" }),
  dob: z.coerce.date({
    message: "Please add a date of birth.",
  }),
  gender: z.string(),
  nationality: z.string(),
  maritalStatus: z.string(),
  address: z.string().min(2, {
    message: "Please add an address.",
  }),
  province: z.enum([
    "Gauteng",
    "Limpopo",
    "Free State",
    "North-West",
    "Western Cape",
    "Eastern Cape",
    "Kwa-Zulu Natal",
    "Northern Cape",
    "Mpumalanga",
  ]),
  city: z.string().min(2, {
    message: "Please add a city.",
  }),
  zipCode: z.string().min(2, {
    message: "Please add a zip code.",
  }),
});

export default function PersonalData() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="grid grid-cols-2 gap-8">

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="First Name" {...field} className="rounded-xl w-full"/>
              </FormControl>
              <FormMessage color="text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Last Name" {...field} className="rounded-xl w-full"/>
              </FormControl>

              <FormMessage color="text-red-600" />
            </FormItem>
          )}
        />
        </div>

        <div className="grid grid-cols-2 gap-8">

        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Mobile Number" {...field} className="rounded-xl w-full"/>
              </FormControl>

              <FormMessage color="text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email Address" {...field} className="rounded-xl w-full"/>
              </FormControl>

              <FormMessage color="text-red-600" />
            </FormItem>
          )}
        />
        </div>

        <div className="grid grid-cols-2 gap-8">

        <FormField
          control={form.control}
          name="maritalStatus"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-xl w-full">
                    <SelectValue placeholder="Marital Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"} className="rounded-xl w-full">
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <FaCalendar />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        </div>

        <div className="grid grid-cols-2 gap-8">

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-xl w-full">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Man">Man</SelectItem>
                  <SelectItem value="Woman">Woman</SelectItem>
                  <SelectItem value="NonBinary">Non-Binary</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-xl w-full">
                    <SelectValue placeholder="Nationality" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent >
                  <SelectItem value="Citizen">Citizen</SelectItem>
                  <SelectItem value="Naturalized">Naturalized</SelectItem>
                  <SelectItem value="Visa">Visa</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        </div>


          <>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Address" {...field} className="rounded-xl w-full" />
              </FormControl>
              <FormMessage color="text-red-600" />
            </FormItem>
          )}
        />

          </>

          <div className="grid grid-cols-3 gap-8">
          <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="City" {...field} className="rounded-xl w-full"/>
              </FormControl>
              <FormMessage color="text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger  className="rounded-xl w-full">
                    <SelectValue placeholder="Province"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Gauteng">Gauteng</SelectItem>
                  <SelectItem value="Limpopo">Limpopo</SelectItem>
                  <SelectItem value="Mpumalanga">Mpumalanga</SelectItem>
                  <SelectItem value="NorthWest">North-West</SelectItem>
                  <SelectItem value="WesternCape">Western Cape</SelectItem>
                  <SelectItem value="EasternCape">Eastern Cape</SelectItem>
                  <SelectItem value="Northern ape">Northern Cape</SelectItem>
                  <SelectItem value="KwaZuluNatal">Kwa-Zulu Natal</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Zip Code" {...field} className="rounded-xl w-full"/>
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
