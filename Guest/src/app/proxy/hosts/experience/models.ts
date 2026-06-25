
export interface HostExperienceSummaryDto {
  id: number;
  name?: string;
  typeId?: number;
  typeName?: string;
  primaryImage?: string;
  ratingsCount: number;
  ratingsAverage: number;
}
