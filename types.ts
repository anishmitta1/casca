import { User } from "@supabase/supabase-js";

type ApplicationState = {
  name: string;
  dba: string;
  numberOfEmployees: number | null;
  estimatedARR: number;
};

type Application = {
  id: string;
  created_at: Date;
  step: string;
  description: string;
  state: ApplicationState;
  configuration: LoanOptionSelection;
};

type LoanOption = {
  termMonths: number;
  interestRate: number;
  maxLoanAmount: number;
};

type LoanOptionSelection = {
  termMonths: number;
  interestRate: number;
  loanAmount: number;
};

export type {
  User,
  Application,
  ApplicationState,
  LoanOption,
  LoanOptionSelection,
};
