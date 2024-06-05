"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEmployee } from "@/app/store";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { createEmployee } from "@/actions/admin/employee/personalData";
import { toast } from "react-toastify";

const formSchema = z.object({
  Name: z.string().min(2, {
    message: "First Name is required.",
  }),
  Surname: z.string().min(2, {
    message: "Last Name is required.",
  }),
  MobileNumber: z
    .string()
    .min(10, {
      message: "Mobile Number must have 10 digits.",
    })
    .max(10, {
      message: "Mobile Number must have 10 digits.",
    }),
  Email: z.string().email({ message: "Please add a valid email" }),
  DateOfBirth: z.coerce.date({
    message: "Please add a date of birth.",
  }),
  Gender: z.string(),
  Nationality: z.string(),
  MaritalStatus: z.string(),
  IdNumber: z.string().min(13, {
    message: "ID Number must have 13 digits.",
  }),
  Address: z.string().min(2, {
    message: "Please add an address.",
  }),
  Province: z.enum([
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
  City: z.string().min(2, {
    message: "Please add a city.",
  }),
  ZipCode: z.string().min(2, {
    message: "Please add a zip code.",
  }),
});

export default function PersonalData() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      Surname: "",
      MobileNumber: "",
      Email: "",
      Address: "",
      IdNumber: "",
      City: "",
      ZipCode: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    useEmployee.setState(values);
    toast.success("Personal Data has been created successfully.");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="grid grid-cols-2 gap-8">

        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="First Name" {...field} className="rounded-xl w-full"/>
              </FormControl>
              <FormMessage style={{ color: "red" }} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Surname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Last Name" {...field} className="rounded-xl w-full"/>
              </FormControl>

              <FormMessage style={{ color: "red" }} />
            </FormItem>
          )}
        />
        </div>

        <div className="grid grid-cols-2 gap-8">



        <FormField
          control={form.control}
          name="IdNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="ID Number" {...field} className="rounded-xl w-full"/>
              </FormControl>
              <FormMessage style={{ color: "red" }} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email Address" {...field} className="rounded-xl w-full"/>
              </FormControl>

              <FormMessage style={{ color: "red" }} />
            </FormItem>
          )}
        />
        </div>

        <div className="grid grid-cols-2 gap-8">

        <FormField
          control={form.control}
          name="MaritalStatus"
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

              <FormMessage style={{ color: "red" }} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="DateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"} className="rounded-xl w-full">
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Date of Birth</span>
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

              <FormMessage style={{ color: "red" }}/>
            </FormItem>
          )}
        />

        </div>

        <div className="grid grid-cols-2 gap-8">

        <FormField
          control={form.control}
          name="Gender"
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

              <FormMessage style={{ color: "red" }} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Nationality"
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

              <FormMessage style={{ color: "red" }}/>
            </FormItem>
          )}
        />
        </div>


          <div className="grid grid-cols-2 gap-8">

        <FormField
          control={form.control}
          name="Address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Address" {...field} className="rounded-xl w-full" />
              </FormControl>
              <FormMessage style={{ color: "red" }} />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="MobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Mobile Number" {...field} className="rounded-xl w-full"/>
              </FormControl>

              <FormMessage style={{ color: "red" }} />
            </FormItem>
          )}
        />

          </div>

          <div className="grid grid-cols-3 gap-8">
          <FormField
          control={form.control}
          name="City"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="City" {...field} className="rounded-xl w-full"/>
              </FormControl>
              <FormMessage style={{ color: "red" }} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Province"
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
          name="ZipCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Zip Code" {...field} className="rounded-xl w-full"/>
              </FormControl>
              <FormMessage style={{ color: "red" }} />
            </FormItem>
          )}
        />
          </div>

          <div className="flex items-end gap-x-4 justify-end">
          <Button className="rounded-xl text-white" type="submit">Save</Button>
        </div>

      </form>
    </Form>
  );
}
