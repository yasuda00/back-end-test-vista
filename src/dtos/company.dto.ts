
export interface CreateCompanyDto {
  name: string;
  registrationNumber: string;
}

export interface CompanyResponseDto {
  id: number;
  name: string;
  registrationNumber: string;
}

export interface CompanyWithServicesDto extends CompanyResponseDto {
  services: {
    id: number;
    companyId: number;
    name: string;
    description: string | null;
    price: string;
  }[];
}
