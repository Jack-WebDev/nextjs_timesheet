"use client";

import { DateRange as DayPickerDateRange } from "react-day-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, CircleHelp } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format, isWeekend } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Loading from "./loading";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full Name is required.",
  }),
  email: z
    .string()
    .email({ message: "Please add a valid email" })
    .refine((email) => email.endsWith("@ndt.co.za"), {
      message: "Email must be a valid NDT email",
    }),
  phoneNumber: z
    .string().trim()
    .min(10, {
      message: "Phone Number must have 10 digits.",
    })
    .max(10, {
      message: "Phone Number must have 10 digits.",
    }),
  position: z.string().min(2, {
    message: "Position is required.",
  }),
  requestFor: z.enum(["Days", "Hours"], {
    required_error: "You need to select a request.",
  }),
  reason: z.string().min(2, {
    message: "A reason is required.",
  }),
  date: z.string({
    message: "Please enter a valid date.",
  }),
});

const leaveTypes = [
  {
    type: "Annual Leave",
    description: "Paid time off granted for rest and relaxation.",
  },
  {
    type: "Sick Leave",
    description: "Time off provided when ill or need medical attention.",
  },
  {
    type: "Maternity Leave",
    description:
      "Leave granted to female employees for childbirth and postnatal care.",
  },
  {
    type: "Paternity Leave",
    description:
      "Leave granted to male employees for childbirth and care of the newborn.",
  },

  {
    type: "Bereavement Leave",
    description:
      "Time off to grieve and attend the funeral of a close relative.",
  },
  {
    type: "Unpaid Leave",
    description: "Time off without pay, for personal reasons.",
  },
  {
    type: "Study Leave",
    description: "Time off granted to pursue further education or training.",
  },
  {
    type: "Compassionate Leave",
    description: "Leave for urgent family matters or crises.",
  },
  {
    type: "Sabbatical Leave",
    description:
      "Extended leave granted for personal development or research, after a long period of service.",
  },
];

export default function LeaveForm() {
  const [date, setDate] = useState<DayPickerDateRange | undefined>(undefined);
  const [hoursDate, setHoursDate] = useState<Date>();
  const [startHour, setStartHour] = useState<string>("");
  const [endHour, setEndHour] = useState<string>("");
  const [selectedLeaveType, setSelectedLeaveType] = useState<string>("");
  const [leaveFor, setLeaveFor] = useState<"Days" | "Hours">("Days");
  const [loading, setLoading] = useState(false);

  const calculateWorkingDays = (startDate?: Date, endDate?: Date): number => {
    if (!startDate || !endDate) {
      return 0;
    }

    let workingDays = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (!isWeekend(currentDate)) {
        workingDays++;
      }
      currentDate = addDays(currentDate, 1);
    }

    return workingDays;
  };

  const totalDays = calculateWorkingDays(date?.from, date?.to);

  const calculateTotalHours = (start: string, end: string): number => {
    const [startHours, startMinutes] = start.split(":").map(Number);
    const [endHours, endMinutes] = end.split(":").map(Number);

    const startDate = new Date();
    const endDate = new Date();

    startDate.setHours(startHours, startMinutes);
    endDate.setHours(endHours, endMinutes);

    const diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    return parseFloat(diff.toFixed(2));
  };

  const totalHours =
    startHour && endHour ? calculateTotalHours(startHour, endHour) : 0;

  const formattedDate = `${
    addDays(date?.from ?? new Date(), 1)
      .toISOString()
      .split("T")[0]
  } to ${
    addDays(date?.to ?? new Date(), 1)
      .toISOString()
      .split("T")[0]
  }`;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      position: "",
      requestFor: "Days",
      reason: "",
      date: formattedDate,
    },
  });

  const handleLeaveTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedLeaveType(event.target.value);
  };

  const handleLeaveForChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLeaveFor(event.target.value as "Days" | "Hours");
  };
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const formData = {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      position: values.position,
      requestFor: values.requestFor,
      reason: values.reason,
      date: values.date,
      totalHours: totalHours,
      totalDays: totalDays,
    };
    console.log(formData);
  }

  return (
    <div>
      {loading && <Loading />}
      <div className="border-2 border-primary p-4 rounded-xl w-1/3">
        <h3>Number of Annual Leave Days Left:</h3>
        <span>23</span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-x-12 justify-items-center space-y-8 bg-[rgba(162,161,168,0.05)] rounded-xl p-8 mt-8 mx-auto"
        >
          <div>
            <div className="grid grid-cols-2 gap-x-12">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                        className="rounded-xl w-full placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage style={{ color: "red" }} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="rounded-xl w-full placeholder:text-gray-500"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage style={{ color: "red" }} />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-12">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
                        {...field}
                        className="rounded-xl w-full placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage style={{ color: "red" }} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Position</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your position"
                        {...field}
                        className="rounded-xl w-full placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage style={{ color: "red" }} />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <h2 className="text-center text-3xl font-semibold mt-8">
                Details of Leave Request
              </h2>
              <div className="flex justify-between items-center gap-x-2 my-12">
                <h2 className="text-xl font-medium">Leave Request For:</h2>
                <div className="flex items-center gap-x-2">
                  <div>
                    <label className="flex items-center gap-x-2">
                      <input
                        type="radio"
                        value="Days"
                        checked={leaveFor === "Days"}
                        onChange={handleLeaveForChange}
                        className="custom-radio-input"
                      />
                      Days
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center gap-x-2">
                      <input
                        type="radio"
                        value="Hours"
                        checked={leaveFor === "Hours"}
                        onChange={handleLeaveForChange}
                        className="custom-radio-input"
                      />
                      Hours
                    </label>
                  </div>
                </div>
              </div>
              <div>
                {leaveFor === "Days" ? (
                  <>
                    <div className="flex items-end gap-x-16">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-md">
                              Date of Leave
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  id="date"
                                  variant={"outline"}
                                  className={cn(
                                    "w-[300px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {date?.from ? (
                                    date.to ? (
                                      <>
                                        {format(date.from, "LLL dd, y")} -{" "}
                                        {format(date.to, "LLL dd, y")}
                                      </>
                                    ) : (
                                      format(date.from, "LLL dd, y")
                                    )
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  initialFocus
                                  mode="range"
                                  defaultMonth={date?.from}
                                  selected={date}
                                  onSelect={setDate}
                                  numberOfMonths={1}
                                  fromMonth={new Date()}
                                />
                              </PopoverContent>
                            </Popover>

                            <FormMessage style={{ color: "red" }} />
                          </FormItem>
                        )}
                      />

                      <div className="flex flex-col items-baseline gap-x-2">
                        <span>
                          Leave Start:{" "}
                          <span className="text-primary">
                            {date?.from
                              ? format(date.from, "LLL dd, y")
                              : new Date().toISOString().split("T")[0]}
                          </span>
                        </span>
                        <span>
                          Leave End:{" "}
                          <span className="text-primary">
                            {date?.to
                              ? format(date.to, "LLL dd, y")
                              : new Date().toISOString().split("T")[0]}
                          </span>
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-end gap-x-16">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-md">
                              Date of Leave
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {hoursDate ? (
                                    format(hoursDate, "LLL dd, y")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={hoursDate}
                                  onSelect={setHoursDate}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>

                            <FormMessage style={{ color: "red" }} />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-end gap-x-2">
                        <div>
                          <input
                            type="time"
                            value={startHour}
                            onChange={(e) => setStartHour(e.target.value)}
                            className="bg-transparent border border-primary px-2"
                          />
                        </div>
                        <span className="mx-4">Until</span>
                        <div>
                          <input
                            type="time"
                            value={endHour}
                            onChange={(e) => setEndHour(e.target.value)}
                            className="bg-transparent border border-primary px-2"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="my-8">
                <div>
                  <h3 className="text-xl font-medium mb-8">Leave Type</h3>
                  <div className="grid grid-cols-3 items-center gap-4">
                    {leaveTypes.map((leave) => (
                      <TooltipProvider key={leave.type}>
                        <div className="flex items-center gap-x-2">
                          <input
                            type="radio"
                            id={leave.type}
                            name="leaveType"
                            value={leave.type}
                            checked={selectedLeaveType === leave.type}
                            onChange={handleLeaveTypeChange}
                            className="custom-radio-input"
                            required={true}
                          />
                          <label
                            htmlFor={leave.type}
                            className="flex items-center gap-x-2"
                          >
                            {leave.type}{" "}
                            <Tooltip>
                              <TooltipTrigger>
                                <CircleHelp width={"80%"} />
                              </TooltipTrigger>
                              <TooltipContent className="rounded-xl text-white font-semibold">
                                {leave.description}
                              </TooltipContent>
                            </Tooltip>
                          </label>
                        </div>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              </div>
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium">
                      Your Reason
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the reason for the leave request"
                        className="rounded-xl placeholder:text-gray-500"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage style={{ color: "red" }} />
                  </FormItem>
                )}
              />{" "}
            </div>
            <Button type="submit" className="rounded-xl text-white mt-8">
              Request Leave
            </Button>
          </div>
          <div className="border border-primary p-4 rounded-xl h-1/2 w-[80%]">
            <h2 className="text-center text-2xl font-semibold">
              Your Request Leave Summary
            </h2>
            <div>
              <div className="flex justify-between items-center mx-8 mt-12">
                <label htmlFor="">Leave For: </label>
                <span className="font-bold text-xl">{leaveFor}</span>
              </div>
              <div className="flex justify-between items-center mx-8 mt-12">
                <label htmlFor="">Leave Type: </label>
                <span className="font-bold text-xl">{selectedLeaveType}</span>
              </div>
              <div className="flex justify-between items-center mx-8 mt-12">
                <label htmlFor="">Leave Period: </label>
                <span className="font-bold text-xl">{formattedDate}</span>
              </div>

              {leaveFor === "Days" ? (
                <div className="flex justify-between items-center mx-8 mt-12">
                  <label htmlFor="">Number of Working Days Taken: </label>
                  <span className="font-bold text-xl">
                    {calculateWorkingDays(date?.from, date?.to)}
                  </span>
                </div>
              ) : (
                <div className="flex justify-between items-center mx-8 mt-12">
                  <label htmlFor="">Total Hours Taken: </label>
                  <span className="font-bold text-xl">{totalHours}</span>
                </div>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
