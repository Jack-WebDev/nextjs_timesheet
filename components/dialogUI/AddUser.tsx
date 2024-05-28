"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";

export function AddUser() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  const handleSave = async () => {
    try {
      await axios.post(`http://localhost:3000/api/users`, {
        name,
        surname,
        email,
        password,
        department,
        status,
        role,
      });
      localStorage.clear();

      window.location.reload();
    } catch (error) {
      toast.error(
        "An error oocured while saving. Please reload the screen and try again."
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl bg-primary text-white gap-x-4 hover:bg-primary">
          <FaPlusCircle />
          Add New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              className="col-span-3 rounded-xl focus:border-primary"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="surname" className="text-right">
              Surname
            </Label>
            <Input
              id="surname"
              value={surname}
              className="col-span-3 rounded-xl focus:border-primary"
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              className="col-span-3 rounded-xl focus:border-primary"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              value={password}
              className="col-span-3 rounded-xl focus:border-primary"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Input
              id="status"
              value={status}
              className="col-span-3 rounded-xl focus:border-primary"
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="department" className="text-right">
              Department
            </Label>
            <Input
              id="department"
              value={department}
              className="col-span-3 rounded-xl focus:border-primary"
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Input
              id="role"
              value={role}
              className="col-span-3 rounded-xl focus:border-primary"
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-primary text-white rounded-xl hover:bg-primary"
            onClick={handleSave}
          >
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
