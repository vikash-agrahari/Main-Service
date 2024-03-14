export interface OrderListing {
  limit: number;
  page: number;
  search?: string;
  sortedBy?: string;
  sortOrder?: number;
  getCount?: boolean;
}
