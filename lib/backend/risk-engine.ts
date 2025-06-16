"use server";

import { LoanOption } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analyseBankStatements = async (file: File) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const creditScore = (Math.floor(Math.random() * (80 - 50 + 1)) + 50) * 10;

  return {
    creditScore,
  };
};

const getLoanOptions = async (creditScore: number): Promise<LoanOption[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (creditScore < 600) {
    return [
      { termMonths: 6, interestRate: 28.0, maxLoanAmount: 100000 },
      { termMonths: 12, interestRate: 25.0, maxLoanAmount: 100000 },
      { termMonths: 18, interestRate: 23.5, maxLoanAmount: 100000 },
    ];
  } else if (creditScore < 700) {
    return [
      { termMonths: 12, interestRate: 19.0, maxLoanAmount: 250000 },
      { termMonths: 24, interestRate: 17.5, maxLoanAmount: 250000 },
      { termMonths: 36, interestRate: 15.5, maxLoanAmount: 250000 },
      { termMonths: 48, interestRate: 14.0, maxLoanAmount: 250000 },
    ];
  } else {
    return [
      { termMonths: 12, interestRate: 13.0, maxLoanAmount: 1000000 },
      { termMonths: 24, interestRate: 11.5, maxLoanAmount: 1000000 },
      { termMonths: 36, interestRate: 10.5, maxLoanAmount: 1000000 },
      { termMonths: 48, interestRate: 9.5, maxLoanAmount: 1000000 },
      { termMonths: 60, interestRate: 8.5, maxLoanAmount: 1000000 },
    ];
  }
};

export { analyseBankStatements, getLoanOptions };
