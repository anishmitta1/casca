"use server";
import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { Application } from "@/types";

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

const getApplications = async (): Promise<Application[]> => {
  const client = await loanApplicationClient();

  const { data } = await client.select("*");

  return data ?? [];
};

const discardApplication = async (id: string) => {
  const client = await loanApplicationClient();

  return client.delete().eq("id", id);
};

export { startNewApplication, getApplications, discardApplication };
