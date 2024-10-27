import React from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import Header from "./header";
import BackButton from "./back-button";

const ErrorCard = () => {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <Header label={"Oops! Something went wrong"}></Header>
      </CardHeader>
      <CardFooter>
        <BackButton label={"Back to login"} href={"/auth/login"} />
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
