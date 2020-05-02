import { IStateCase } from "./IStateCase";

export interface IStateApiResponse {
  case_time_series: Object[];
  statewise: IStateCase[];
  tested: Object[];
}
