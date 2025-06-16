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
};

export type { User, Application, ApplicationState };
