"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";

import CardWrapper from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { newVerification } from "@/actions/new-verification";
import FormSuccess from "../form-success";
import FormError from "../form-error";

const NewVerificationForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const urlToken = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!urlToken) {
      setError("Token not found!");
      return;
    }

    newVerification(urlToken)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((error) => {
        setError(error);
      });
  }, [urlToken]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel={"Verify your email"}
      backButtonLabel={"Back to login"}
      backButtonHref={"/auth/login"}
    >
      <div className="flex items-center justify-center w-full">
        {!success && !error && <BeatLoader />}
        {success && <FormSuccess message={success} />}
        {error && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
