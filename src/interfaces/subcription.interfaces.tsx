export interface SubcriptionResI {
  data: SubcriptionI;
}

export interface SubcriptionI {
  product: string;
  start_date: string;
  end_date: string;
  payment: string;
  status?: string;
}
