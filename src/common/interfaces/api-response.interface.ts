export interface IAPIResponse<D = any> {
  success: boolean;
  data: D;
}
