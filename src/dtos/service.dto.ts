
export interface CreateServiceDto {
  companyId: number;
  name: string;
  description?: string;
  price: number;
}

export interface ServiceResponseDto {
  id: number;
  companyId: number;
  name: string;
  description: string | null;
  price: string;
}
