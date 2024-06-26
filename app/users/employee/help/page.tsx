"use client";

import { useEffect, useState } from "react";
import { Student, AP, type HelpDesk } from "@/types/helpDeskProps";
import axios from "axios";
import { useThemeStore, useUser } from "@/app/store";
import useFetchTickets from "@/hooks/useFetchTickets";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loading from "../loading";

export default function HelpDesk() {
  const user = useUser();
  const { isDarkMode } = useThemeStore();
  const tickets = useFetchTickets();
  const [isFormVisible, setFormVisible] = useState(false);
  const [isDoneProcessing, setIsProcessing] = useState(false);
  const [isCallEnded, setCallEnded] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState("");
  const [apData, setAPData] = useState<AP>({
    property: "",
    contactPerson: "",
    contactNo: "",
  });
  const [studentData, setStudentData] = useState<Student>({
    idNumber: "",
    studentNumber: "",
    contactNumber: "",
    email: "",
    institution: "",
    accommodation: "",
    fullName: "",
  });
  const [helpDeskData, setHelpDeskData] = useState<HelpDesk>({
    date: new Date().toISOString().split("T")[0],
    callDuration: "",
    resolve: "",
    status: "",
    client: "",
    query: "",
    problem: "",
    campus: "",
    callAgent: user.NDTEmail,
  });

  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState<string>("");
  const [totalTickets, setTotalTickets] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const filteredTickets = tickets.filter(
      (ticket) => ticket.callAgent === user.NDTEmail
    );
    setTotalTickets(filteredTickets.length);
  }, [tickets, user.NDTEmail]);

  const startCall = () => {
    setStartTime(new Date());
    setEndTime(null);
    setDuration("");
  };

  const endCall = () => {
    if (startTime) {
      const end = new Date();
      setEndTime(end);
      const duration = calculateDuration(startTime, end);
      setDuration(formatDuration(duration));
    }
  };

  const calculateDuration = (start: Date, end: Date) => {
    const diff = end.getTime() - start.getTime();
    return diff;
  };

  const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);
    return `${hours}hrs - ${minutes}mins - ${seconds}secs`;
  };

  const handleAPData = (field: keyof AP, value: string) => {
    setAPData((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleStudentData = (field: keyof Student, value: string) => {
    setStudentData((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleHelpDeskData = (field: keyof HelpDesk, value: string) => {
    setHelpDeskData((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const preEndCallValidation = () => {
    let isValid = true;

    if (!helpDeskData.campus) {
      toast.error("Campus is required");
      isValid = false;
    }
    if (!helpDeskData.query) {
      toast.error("Query is required");
      isValid = false;
    }
    if (!helpDeskData.problem) {
      toast.error("Problem is required");
      isValid = false;
    }

    return isValid;
  };

  const postEndCallValidation = () => {
    let isValid = true;

    if (!helpDeskData.resolve) {
      toast.error("Resolve is required");
      isValid = false;
    }

    if (!selectedResolution) {
      toast.error("Status is required");
      isValid = false;
    }

    return isValid;
  };

  const validateAPData = () => {
    let isValid = true;

    if (!apData.property) {
      toast.error("Property is required");
      isValid = false;
    }
    if (!apData.contactPerson) {
      toast.error("Contact Person is required");
      isValid = false;
    }
    if (
      !apData.contactNo ||
      apData.contactNo.length < 10 ||
      apData.contactNo.length > 10
    ) {
      toast.error("Please enter a valid Contact Number");
      isValid = false;
    }

    return isValid;
  };

  const validateStudentData = () => {
    let isValid = true;

    if (!studentData.fullName) {
      toast.error("Full Name is required");
      isValid = false;
    }
    if (
      !studentData.idNumber ||
      studentData.idNumber.length < 13 ||
      studentData.idNumber.length > 13
    ) {
      toast.error("Please enter a valid ID Number");
      isValid = false;
    }
    if (
      !studentData.contactNumber ||
      studentData.contactNumber.length < 10 ||
      studentData.contactNumber.length > 10
    ) {
      toast.error("Please enter a valid Contact Number");
      isValid = false;
    }
    if (!studentData.email || !studentData.email.includes("@")) {
      toast.error("Please enter a valid email");
      isValid = false;
    }
    if (!studentData.institution) {
      toast.error("Institution is required");
      isValid = false;
    }
    if (!studentData.accommodation) {
      toast.error("Accommodation is required");
      isValid = false;
    }

    return isValid;
  };

  const handleStartCall = () => {
    setIsProcessing(true);
    setFormVisible(true);
    startCall();
  };

  const handleEndCall = () => {
    if (helpDeskData.client === "AP") {
      if (validateAPData() && preEndCallValidation()) {
        setFormVisible(false);
        setCallEnded(true);
        endCall();
      }
    } else {
      if (validateStudentData() && preEndCallValidation()) {
        setFormVisible(false);
        setCallEnded(true);
        endCall();
      }
    }
  };

  const handleCreateAPTicket = async () => {
    if (postEndCallValidation()) {
      const formData = {
        property: apData.property,
        contactPerson: apData.contactPerson,
        contactNo: apData.contactNo,
        date: helpDeskData.date,
        campus: helpDeskData.campus,
        query: helpDeskData.query,
        problem: helpDeskData.problem,
        resolve: helpDeskData.resolve,
        client: helpDeskData.client,
        duration: duration,
        status: selectedResolution,
      };
      console.log(formData);
      try {
        setLoading(true);
        const res = await axios.post("/api/helpdesk/ap", formData);
        console.log(res);
        setLoading(false);
        setIsProcessing(false);
        toast.success("Ticket created successfully");
        window.location.reload();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const handleCreateStudentTicket = async () => {
    if (postEndCallValidation()) {
      const formData = {
        fullName: studentData.fullName,
        idNumber: studentData.idNumber,
        studentNumber: studentData.studentNumber,
        contactNumber: studentData.contactNumber,
        email: studentData.email,
        institution: studentData.institution,
        accommodation: studentData.accommodation,
        date: helpDeskData.date,
        campus: helpDeskData.campus,
        query: helpDeskData.query,
        problem: helpDeskData.problem,
        resolve: helpDeskData.resolve,
        client: helpDeskData.client,
        duration: duration,
        status: selectedResolution,
      };

      console.log(formData);
      try {
        setLoading(true);
        const res = await axios.post("/api/helpdesk/student", formData);
        console.log(res);
        setLoading(false);
        setIsProcessing(false);
        toast.success("Ticket created successfully");
        window.location.reload();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const handleResolutionChange = (e: any) => {
    setSelectedResolution(e.target.value);
  };

  return (
    <>
          {loading && <Loading />}

    <div className="grid rounded-xl p-4 bg-[#F5F5F5] mt-8 border-2 border-primary">

      <div className="flex justify-around items-center mb-12">
        <div className="grid rounded-xl border-2 border-[rgba(162,161,168,0.2)]  px-4 py-2  w-[15%] ">
          <h2>Total tickets</h2>
          <p className="font-semibold">{totalTickets}</p>
        </div>

        <button
          onClick={handleStartCall}
          className={`p-4 rounded-xl text-white ${
            isDoneProcessing ? "bg-[rgba(1,90,74,0.5)]" : "bg-[rgba(1,90,74,0.8)]"
          }`}
          disabled={isDoneProcessing}
        >
          Start Call
        </button>
      </div>

      <div className="grid ">
        {isFormVisible && (
          <>
            <div className="flex justify-evenly items-center">
              <div className="grid mb-4 pointer-events-none">
                <label htmlFor="date" className="mb-2">Date:</label>
                <input
                  type="date"
                  id="date"
                  className="border border-primary p-2 rounded-xl bg-transparent"
                  value={helpDeskData.date}
                  readOnly
                />
              </div>
              <div className="grid mb-4">
                <label htmlFor="option" className="mb-2">Select an option:</label>
                <select
                  id="option"
                  className={`border border-primary p-2 rounded-xl ${isDarkMode ? "bg-[rgba(0,0,0,0.3)]" : "bg-[#F5F5F5]"}`}
                  value={helpDeskData.client}
                  onChange={(e) => handleHelpDeskData("client", e.target.value)}
                >
                  <option className="bg-transparent" value="">Select...</option>
                  <option className="bg-transparent" value="AP">AP</option>
                  <option className="bg-transparent" value="Student">Student</option>
                </select>
              </div>
            </div>

            {helpDeskData.client && (
              <div className="grid w-[75%] mx-auto">
                {helpDeskData.client === "AP" && (
                  <>
                    <div>
                      <h2 className="text-center text-2xl">AP Query:</h2>
                      <div>
                        <div className="flex justify-around items-center">
                          <div className="grid">
                            <label htmlFor="apField">Query:</label>
                            <input
                              type="text"
                              id="apField"
                              className="border border-primary p-2 rounded-xl bg-transparent"
                              value={helpDeskData.query}
                              onChange={(e) =>
                                handleHelpDeskData("query", e.target.value)
                              }
                            />
                          </div>

                          <div className="grid">
                            <label htmlFor="apField">Describe Query:</label>
                            <textarea
                              id="apField"
                              className="border border-primary p-2 rounded-xl bg-transparent"
                              value={helpDeskData.problem}
                              onChange={(e) =>
                                handleHelpDeskData("problem", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>{" "}
                    </div>
                    <div>
                      <h2 className="text-center text-2xl">AP Details:</h2>
                      <div>
                        <div className="flex justify-around items-center">
                          <div>
                            <div className="grid">
                              <label htmlFor="apField">Property Name:</label>
                              <input
                                type="text"
                                id="apField"
                                className="border border-primary p-2 rounded-xl bg-transparent"
                                value={apData.property}
                                onChange={(e) =>
                                  handleAPData("property", e.target.value)
                                }
                              />
                            </div>
                            <div className="grid">
                              <label htmlFor="apField">Contact Number:</label>
                              <input
                                type="text"
                                id="apField"
                                className="border border-primary p-2 rounded-xl bg-transparent"
                                value={apData.contactNo}
                                onChange={(e) =>
                                  handleAPData("contactNo", e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div>
                            <div className="grid">
                              <label htmlFor="apField">Full Name:</label>
                              <input
                                type="text"
                                id="apField"
                                className="border border-primary p-2 rounded-xl bg-transparent"
                                value={apData.contactPerson}
                                onChange={(e) =>
                                  handleAPData("contactPerson", e.target.value)
                                }
                              />
                            </div>

                            <div className="grid">
                              <label htmlFor="apField">Campus:</label>
                              <input
                                type="text"
                                id="apField"
                                className="border border-primary p-2 rounded-xl bg-transparent"
                                value={helpDeskData.campus}
                                onChange={(e) =>
                                  handleHelpDeskData("campus", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {helpDeskData.client === "Student" && (
                  <>
                    <div>
                      <h2 className="text-center text-2xl">Student Query:</h2>
                      <div>
                        <div className="flex justify-around items-center">
                          <div className="grid">
                            <label htmlFor="apField">Query:</label>
                            <input
                              type="text"
                              id="apField"
                              className="border border-primary p-2 rounded-xl bg-transparent"
                              value={helpDeskData.query}
                              onChange={(e) =>
                                handleHelpDeskData("query", e.target.value)
                              }
                            />
                          </div>

                          <div className="grid">
                            <label htmlFor="apField">Describe Query:</label>
                            <textarea
                              id="apField"
                              className="border border-primary p-2 rounded-xl bg-transparent"
                              value={helpDeskData.problem}
                              onChange={(e) =>
                                handleHelpDeskData("problem", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>{" "}
                    </div>
                    <div>
                      <h2 className="text-center text-2xl">Student Details:</h2>
                      <div className="grid">
                        <div className="flex justify-around items-center">
                          <div className="grid">
                            <label htmlFor="apField">Full Name:</label>
                            <input
                              type="text"
                              id="apField"
                              className="border border-primary p-2 rounded-xl bg-transparent"
                              value={studentData.fullName}
                              onChange={(e) =>
                                handleStudentData("fullName", e.target.value)
                              }
                            />
                          </div>
                          <div className="grid">
                            <label htmlFor="apField">ID Number:</label>
                            <input
                              type="text"
                              id="apField"
                              className="border border-primary p-2 rounded-xl bg-transparent"
                              value={studentData.idNumber}
                              onChange={(e) =>
                                handleStudentData("idNumber", e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="flex justify-around items-center">
                        <div className="grid">
                            <label htmlFor="apField">Institution:</label>
                            <input
                              type="text"
                              id="apField"
                              className="border border-primary p-2 rounded-xl bg-transparent"
                              value={studentData.institution}
                              onChange={(e) =>
                                handleStudentData("institution", e.target.value)
                              }
                            />
                          </div>
                          <div className="grid">
                            <label htmlFor="apField">Campus:</label>
                            <input
                              type="text"
                              id="apField"
                              className="border border-primary p-2 rounded-xl bg-transparent"
                              value={helpDeskData.campus}
                              onChange={(e) =>
                                handleHelpDeskData("campus", e.target.value)
                              }
                            />
                          </div>

                        </div>
                        <div className="flex justify-around items-center">
                          <div className="grid">
                            <label htmlFor="apField">Accomodation:</label>
                            <input
                              type="text"
                              id="apField"
                              className="border border-primary p-2 rounded-xl bg-transparent"
                              value={studentData.accommodation}
                              onChange={(e) =>
                                handleStudentData(
                                  "accommodation",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div className="grid">
                            <label htmlFor="apField">Student Number:</label>
                            <input
                              type="text"
                              id="apField"
                              className="border border-primary p-2 rounded-xl bg-transparent"
                              value={studentData.studentNumber}
                              onChange={(e) =>
                                handleStudentData(
                                  "studentNumber",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="flex justify-around items-center">
                          <div className="grid">
                            <label htmlFor="apField">Contact Number:</label>
                            <input
                              type="text"
                              id="apField"
                              className="border border-primary p-2 rounded-xl bg-transparent"
                              value={studentData.contactNumber}
                              onChange={(e) =>
                                handleStudentData(
                                  "contactNumber",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div className="grid">
                            <label htmlFor="apField">Email:</label>
                            <input
                              type="email"
                              id="apField"
                              className="border border-primary p-2 rounded-xl bg-transparent"
                              value={studentData.email}
                              onChange={(e) =>
                                handleStudentData("email", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <button
                  onClick={handleEndCall}
                  className="bg-red-600 text-white rounded-xl p-4 grid justify-self-end mr-[7rem] mt-[3rem] mb-8"
                >
                  End Call
                </button>
              </div>
            )}
          </>
        )}

        {isCallEnded && (
          <>
            <div className="flex justify-evenly items-center">
              <div className="grid mb-4">
                <label htmlFor="option" className="mb-2">Select an option:</label>
                <select
                  id="option"
                  className={`border border-primary p-2 rounded-xl ${isDarkMode ? "bg-[rgba(0,0,0,0.3)]" : "bg-[#F5F5F5]"}`}
                  value={selectedResolution}
                  onChange={handleResolutionChange}
                >
                  <option value="">Select...</option>
                  <option value="FreshDesk">Sent to FreshDesk</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="grid">
                <label htmlFor="resolve">Comment for Resolution:</label>
                <textarea
                  id="resolve"
                  className="border border-primary p-2 rounded-xl bg-transparent"
                  value={helpDeskData.resolve}
                  onChange={(e) =>
                    handleHelpDeskData("resolve", e.target.value)
                  }
                ></textarea>
              </div>
            </div>

            {helpDeskData.client === "AP" ? (
              <>
                {selectedResolution === "FreshDesk" ? (
                  <button
                    className="rounded-xl text-white bg-primary grid justify-self-center p-4 mt-12 mb-8"
                    onClick={async () => {
                      if (postEndCallValidation()) {
                        try {
                          await axios.post("/api/emails", {
                            property: apData.property,
                            contactPerson: apData.contactPerson,
                            contactNo: apData.contactNo,
                            date: helpDeskData.date,
                            campus: helpDeskData.campus,
                            query: helpDeskData.query,
                            problem: helpDeskData.problem,
                            resolve: helpDeskData.resolve,
                            client: helpDeskData.client,
                            duration: duration,
                            status: selectedResolution,
                            callAgent: helpDeskData.callAgent,
                          });

                          await handleCreateAPTicket();
                          setIsProcessing(false);
                          toast.success("Ticket sent to FreshDesk");
                          window.location.reload();
                        } catch (error) {
                          console.error(
                            "There was an error sending the email:",
                            error
                          );
                        }
                      }
                    }}
                  >
                    Send to FreshDesk
                  </button>
                ) : (
                  <button
                    onClick={handleCreateAPTicket}
                    className="rounded-xl text-white bg-primary grid justify-self-center p-4 mt-12 mb-8"
                  >
                    Create ticket
                  </button>
                )}
              </>
            ) : (
              <>
                {selectedResolution === "FreshDesk" ? (
                  <button
                    className="rounded-xl text-white bg-primary grid justify-self-center p-4 mt-12 mb-8"
                    onClick={async () => {
                      if (postEndCallValidation()) {
                        try {
                          await axios.post("/api/emails", {
                            fullName: studentData.fullName,
                            idNumber: studentData.idNumber,
                            studentNumber: studentData.studentNumber,
                            contactNumber: studentData.contactNumber,
                            email: studentData.email,
                            institution: studentData.institution,
                            accommodation: studentData.accommodation,
                            date: helpDeskData.date,
                            campus: helpDeskData.campus,
                            query: helpDeskData.query,
                            problem: helpDeskData.problem,
                            resolve: helpDeskData.resolve,
                            client: helpDeskData.client,
                          });
                          await handleCreateStudentTicket();
                          setIsProcessing(true);
                          toast.success("Ticket sent to FreshDesk");
                          window.location.reload();
                        } catch (error) {
                          console.error(
                            "There was an error sending the email:",
                            error
                          );
                        }
                      }
                    }}
                  >
                    Send to FreshDesk
                  </button>
                ) : (
                  <button
                    onClick={handleCreateStudentTicket}
                    className="rounded-xl text-white bg-primary grid justify-self-center p-4 mt-12 mb-8"
                  >
                    Create ticket
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
    </>
  );
}
