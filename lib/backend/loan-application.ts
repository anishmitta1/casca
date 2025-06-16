"use server";
import { createClient } from "@/lib/supabase/server";
import { getRandomId } from "../utils";
import { User } from "@supabase/supabase-js";
import { Application } from "@/types";

const loanApplicationClient = async () => {
  const supabase = await createClient();

  return supabase.from("loan_applications");
};

const startNewApplication = async (user: User) => {
  const client = await loanApplicationClient();

  const id = getRandomId();

  return client.insert({
    user_id: user.id,
    application_id: id,
  });
};

const getApplications = async (): Promise<Application[]> => {
  const client = await loanApplicationClient();

  const { data } = await client.select("*");

  return data ?? [];
};

export { startNewApplication, getApplications };
