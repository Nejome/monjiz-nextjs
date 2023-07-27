"use client"
import { signOut } from "next-auth/react"

export default function LogoutButton() {
    return <button onClick={() => signOut()} className="text-gray-500 hover:text-red-500">تسجيل الخروج </button>
}