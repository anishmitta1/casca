"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { updateApplicationOptions } from "@/lib/backend/loan-application";
import {
  analyseBankStatements,
  getLoanOptions,
} from "@/lib/backend/risk-engine";
import { formatCurrency } from "@/lib/utils";
import { Application, LoanOption } from "@/types";
import { ArrowRight, CircleX } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { BarLoader } from "react-spinners";

const formatFileSize = (size: number) => {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(2)} MB`;
};

const calculateMonthlyPayment = (
  principal: number,
  annualInterestRate: number,
  loanTermMonths: number
): number => {
  const monthlyRate = annualInterestRate / 100 / 12;

  if (monthlyRate === 0) return principal / loanTermMonths;

  return (
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTermMonths))
  );
};

interface FileUploadProps {
  application: Application;
}

const FileUpload = ({ application }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [loanOptions, setLoanOptions] = useState<LoanOption[]>([]);
  const [selectedLoanOption, setSelectedLoanOption] =
    useState<LoanOption | null>(null);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  const onUploadFiles = (uploadedFiles: File[]) => setFile(uploadedFiles[0]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onUploadFiles,
    accept: {
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  if (!file) {
    return (
      <div>
        <div className="border border-gray-200 border-2 border-dashed rounded-xl p-4 py-[56px] flex items-center justify-center">
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="flex flex-col gap-2 text-center">
              <div className="text-xl font-semibold">
                Upload Business Bank Statements
              </div>
              <div className="text-md">
                Drag and drop your business bank statements here, or browse
                files.
              </div>
            </div>
            <Button {...getRootProps()} className="rounded-full">
              <input {...getInputProps()} />
              Upload files
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const onContinue = async () => {
    setIsLoading(true);

    const { creditScore } = await analyseBankStatements(file);

    setCreditScore(creditScore);

    const loanOptions = await getLoanOptions(creditScore);

    setLoanOptions(loanOptions);

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="px-16">
        <BarLoader color={resolvedTheme === "dark" ? "#fff" : "#000"} />
      </div>
    );
  }

  if (!creditScore) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2 py-2">
          <div className="py-2 rounded-lg bg-card font-semibold">
            {file.name}
          </div>

          <Badge variant="outline">{formatFileSize(file.size)}</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="flex items-center gap-2"
            variant="outline"
            onClick={() => setFile(null)}
          >
            Choose another file
            <CircleX className="w-4 h-4" />
          </Button>

          <Button className="flex items-center gap-2" onClick={onContinue}>
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  const onSubmitApplication = async () => {
    if (!selectedLoanOption) {
      return;
    }

    await updateApplicationOptions(application.id, {
      termMonths: selectedLoanOption.termMonths,
      interestRate: selectedLoanOption.interestRate,
      loanAmount: loanAmount,
    });

    router.refresh();
  };

  return (
    <div className="px-16">
      <div className="space-y-1">
        <div className="text-2xl">Your Credit Score</div>
        <div className="text-4xl font-semibold">{creditScore}</div>
      </div>
      <div className="mt-8 space-y-4">
        <div>Based on your credit, we have some options for you</div>

        <div>
          <ToggleGroup type="single" variant="outline">
            {loanOptions.map((option) => (
              <ToggleGroupItem
                key={option.termMonths}
                value={option.termMonths.toString()}
                onClick={() => setSelectedLoanOption(option)}
              >
                {option.termMonths} months
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {selectedLoanOption && (
          <div className="space-y-4">
            <div className="mt-8">
              You&apos;re eligible for an interest rate of{" "}
              <span className="font-semibold">
                {selectedLoanOption.interestRate}%
              </span>
            </div>

            <div className="max-w-1/2 space-y-4">
              <Slider
                defaultValue={[selectedLoanOption.maxLoanAmount / 2]}
                value={[loanAmount]}
                onValueChange={(values) => setLoanAmount(values[0])}
                max={selectedLoanOption.maxLoanAmount}
                step={5000}
                style={{
                  maxWidth: 180,
                }}
              />

              <div>
                You&apos;re borrowing{" "}
                <span className="font-semibold">
                  {formatCurrency(loanAmount)}
                </span>{" "}
                resulting in a monthly payment of approximately{" "}
                <span className="font-semibold">
                  {formatCurrency(
                    calculateMonthlyPayment(
                      loanAmount,
                      selectedLoanOption.interestRate,
                      selectedLoanOption.termMonths
                    )
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <Button
        className="mt-8"
        onClick={onSubmitApplication}
        disabled={!selectedLoanOption || !loanAmount}
      >
        Submit Application
      </Button>
    </div>
  );
};

export default FileUpload;
