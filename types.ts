import { User } from "@supabase/supabase-js";

type Application = {
  id: string;
  created_at: Date;
  step: string;
  description: string;
};

export type { User, Application };
