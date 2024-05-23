"use client";
import { useSession } from "next-auth/react";
import React from "react";

const AdminPage = () => {
  const session = useSession();
  console.log(session, "check session");
  return <div className="padding w-full max-md:mt-16"></div>;
};

export default AdminPage;
