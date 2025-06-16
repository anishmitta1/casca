"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const PLACEHOLDER_OPTIONS = [
  "To expand operations",
  "To purchase equipment or inventory",
  "To refinance debt",
  "To hire new employees",
];

// shoutout claude sonnet 4
const useChangingPlaceholder = () => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === PLACEHOLDER_OPTIONS.length) {
      return;
    }

    const currentPhrase = PLACEHOLDER_OPTIONS[index];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (currentIndex < currentPhrase.length) {
          setCurrentText(currentPhrase.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting
        if (currentIndex > 0) {
          setCurrentText(currentPhrase.slice(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          // Move to next phrase
          setIsDeleting(false);

          setIndex(index + 1);
        }
      }
    }, 25);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, index, PLACEHOLDER_OPTIONS]);

  return currentText;
};

interface FormState {
  businessName: string;
  dba: string;
  numberOfEmployees: number | null;
  estimatedARR: number | null;
  reasonForLoan: string;
}

const Form = () => {
  const placeholder = useChangingPlaceholder();

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<FormState>({
    defaultValues: {
      businessName: "",
      dba: "",
      numberOfEmployees: null,
      estimatedARR: null,
      reasonForLoan: "",
    },
  });

  const onSubmit = (data: FormState) => {
    console.log(data);
  };

  console.log({ isValid });

  return (
    <div>
      <div className="text-2xl font-semibold">Tell us about your business</div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-8">
          <Input
            placeholder="Business Name*"
            className="w-fit"
            {...register("businessName", {
              required: true,
            })}
          />
          <Input placeholder="DBA" className="w-fit" {...register("dba")} />
        </div>

        <div className="flex items-center gap-8">
          <Input
            placeholder="Number of Employees"
            className="w-fit"
            {...register("numberOfEmployees")}
          />
          <Input
            placeholder="Estimated ARR*"
            className="w-fit"
            {...register("estimatedARR", { required: true })}
          />
        </div>

        <div className="pt-8">
          <div className="text-sm text-muted-foreground">
            Why are you applying for a loan?
          </div>

          <div className="mt-4">
            <Textarea
              placeholder={placeholder}
              className="w-1/2 h-24"
              {...register("reasonForLoan")}
            />
          </div>
        </div>
      </div>

      <Button
        className="mt-8"
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid}
      >
        Submit
      </Button>
    </div>
  );
};

export default Form;
