"use client"

import { useUser } from "@/app/store";

export default function Tasks() {
  const user = useUser()
  return (
    <div>Data {user.Email}</div>
  )
}
