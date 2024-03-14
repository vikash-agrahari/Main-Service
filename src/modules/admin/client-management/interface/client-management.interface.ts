export interface ClientListing {
  limit: number;
  page: number;
  search?: string;
  sortedBy?: string;
  sortOrder?: number;
  getCount?: boolean;
}
