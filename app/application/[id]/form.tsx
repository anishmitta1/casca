"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";

const PLACEHOLDER_OPTIONS = [
  "To expand operations",
  "To purchase equipment or inventory",
  "To refinance debt",
  "To hire new employees",
];

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

  //   useEffect(() => {
  //     if (index === PLACEHOLDER_OPTIONS.length - 1) {
  //       clearInterval(interval.current!);
  //     }
  //   }, [index]);

  return currentText;
};

const Form = () => {
  const placeholder = useChangingPlaceholder();

  return (
    <div>
      <div className="text-2xl font-semibold">Tell us about your business</div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-8">
          <Input placeholder="Business Name" className="w-fit" />
          <Input placeholder="DBA" className="w-fit" />
        </div>

        <div className="flex items-center gap-8">
          <Input placeholder="Number of Employees" className="w-fit" />
          <Input placeholder="Estimated ARR" className="w-fit" />
        </div>

        <div className="pt-8">
          <div className="text-sm text-muted-foreground">
            Why are you applying for a loan?
          </div>

          <div className="mt-4">
            <Textarea placeholder={placeholder} className="w-1/2 h-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
