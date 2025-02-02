export interface Business {
  id: string;
  owner_id: string;
  name: string;
  google_review_url: string;
  created_at: string;
  updated_at: string;
  logo_url: string | null;
}

export interface Review {
  id: string;
  business_id: string;
  reviewer_name: string;
  rating: number;
  feedback: string | null;
  created_at: string;
}