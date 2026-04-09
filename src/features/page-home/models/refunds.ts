export interface RefundsResponse {
  refunds: RefundsProps;
}

export interface RefundsProps {
  meta: RefundsMeta;
  data: RefundItem[];
}

export interface RefundsMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

export interface RefundItem {
  id: string;
  title: string;
  category: string;
  value: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  receipt: RefundReceipt;
}

export interface RefundReceipt {
  id: string;
  originalFilename: string;
  filename: string;
  path: string;
  extname: string;
  refundId: string;
  createdAt: string;
  updatedAt: string;
}
