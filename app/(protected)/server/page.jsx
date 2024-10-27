import UserInfo from "@/components/auth/user-info";
import { currentUser } from "@/lib/auth";
import React from "react";

const ServerPage = async () => {
  const user = await currentUser();
  return <UserInfo user={user} label={"💻 Server component"} />;
};

export default ServerPage;
