
export interface TaxInvoiceDetailsDto {
  id: number;
  reservationId: number;
  guestId?: string;
  hostId?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  vendorAddress?: string;
  taxRegistrationNumber?: string;
  reservationNo: number;
  valueAddedTax: number;
  priceBeforeValueAddedTax: number;
  priceIncludeValueAddedTax: number;
  qrCodeBase64?: string;
  guestNameAr?: string;
  guestNameEn?: string;
  hostNameEn?: string;
  hostNameAr?: string;
}
