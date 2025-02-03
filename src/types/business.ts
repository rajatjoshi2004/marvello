import type { Database } from '@/integrations/supabase/types';

type Tables = Database['public']['Tables'];

export type Business = Tables['businesses']['Row'] & {
  reviews?: Tables['reviews']['Row'][];
};
export type Review = Tables['reviews']['Row'];