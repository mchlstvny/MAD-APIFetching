import { ApiResponse } from "../types/employee";

export const fetchEmployeesAPI = async (): Promise<ApiResponse> => {
  const response = await fetch(
    "https://dummy.restapiexample.com/api/v1/employees",
  );

  return response.json();
};
