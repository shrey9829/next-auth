"use client";

import React from "react";
import { signIn } from "next-auth/react";

import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_REDIRECT_URL } from "@/routes";

const Social = () => {
  const onClick = (provider) => {
    signIn(provider, {
      callbackUrl: DEFAULT_REDIRECT_URL,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="w-full gap-x-3"
        onClick={() => {
          onClick("google");
        }}
        variant="outline"
        size="lg"
      >
        <FcGoogle className="w-5 h-5" />
        <p>Google</p>
      </Button>
      <Button
        className="w-full gap-x-3"
        onClick={() => {
          onClick("github");
        }}
        variant="outline"
        size="lg"
      >
        <FaGithub className="w-5 h-5" />
        <p>GitHub</p>
      </Button>
    </div>
  );
};

export default Social;
