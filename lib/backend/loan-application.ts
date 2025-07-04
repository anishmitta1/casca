"use server";
import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { Application, ApplicationState, LoanOptionSelection } from "@/types";
import { ApplicationStep } from "@/constants";

const loanApplicationClient = async () => {
  const supabase = await createClient();

  return supabase.from("loan_applications");
};

const startNewApplication = async (user: User): Promise<Application> => {
  const client = await loanApplicationClient();

  const { data: application } = await client
    .insert({
      user_id: user.id,
    })
    .select();

  if (!application) {
    throw new Error("Failed to create new application");
  }

  return application[0];
};

const getApplication = async (id: string): Promise<Application> => {
  const client = await loanApplicationClient();

  const { data } = await client.select("*").eq("id", id).single();

  return data;
};

const getApplications = async (): Promise<Application[]> => {
  const client = await loanApplicationClient();

  const { data } = await client.select("*");

  return data ?? [];
};

const discardApplication = async (id: string) => {
  const client = await loanApplicationClient();

  return client.delete().eq("id", id);
};

const updateApplicationKYB = async (
  id: string,
  state: ApplicationState,
  description: string
) => {
  const client = await loanApplicationClient();

  return client
    .update({
      state,
      description,
      step: ApplicationStep.DOCUMENTS,
    })
    .eq("id", id);
};

const updateApplicationOptions = async (
  id: string,
  selection: LoanOptionSelection
) => {
  const client = await loanApplicationClient();

  return client
    .update({
      configuration: selection,
      step: ApplicationStep.REVIEW,
    })
    .eq("id", id);
};

export {
  startNewApplication,
  getApplication,
  getApplications,
  discardApplication,
  updateApplicationKYB,
  updateApplicationOptions,
};
