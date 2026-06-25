
export interface GuestInvoiceDetailsDto {
  id: number;
  invoiceNumber?: string;
  invoiceDate?: string;
  vendorName?: string;
  vendorAddressAr?: string;
  vendorAddressEn?: string;
  taxRegistrationNumber?: string;
  nameAr?: string;
  nameEn?: string;
  reservationNo: number;
  priceBeforeTax: number;
  totalTax: number;
  priceIncludeTax: number;
  qrCodeBase64?: string;
}

export interface HostCommissionInvoiceDetailsDto {
  id: number;
  invoiceNumber?: string;
  invoiceDate?: string;
  vendorName?: string;
  vendorAddressAr?: string;
  vendorAddressEn?: string;
  taxRegistrationNumber?: string;
  nameAr?: string;
  nameEn?: string;
  hostTaxRegistrationNumber?: string;
  address?: string;
  reservationNo: number;
  priceBeforeTax: number;
  totalTax: number;
  priceIncludeTax: number;
  qrCodeBase64?: string;
}
