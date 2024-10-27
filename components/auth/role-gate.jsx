"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";
import FormError from "../form-error";

const RoleGate = ({ children, allowedRole }) => {
  const user = useCurrentUser();

  if (user?.role !== allowedRole) {
    return (
      <FormError message={"You are not authorized to view this content."} />
    );
  }
  return <>{children}</>;
};

export default RoleGate;
