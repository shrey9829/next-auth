"use client";
import RoleGate from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

const AdminPage = () => {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={"ADMIN"}>
          <FormSuccess message={"You are authorized to view this content."} />
        </RoleGate>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
