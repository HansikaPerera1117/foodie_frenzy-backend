export class PaymentFiltersDto {
  orderCode?: string;
  paymnetStatus?: number;
  orderStatus?: number;
  customerName?: string;
  paymentStartDate?: string;
  paymentEndDate?: string;
  trackingCode?: string;
  page?: number;
  perPage?: number;
}
