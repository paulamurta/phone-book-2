// import { AxiosResponse } from "axios";

// export async function getAllCultivations(
//   page: number,
//   property_id?: number,
//   lot_id?: number,
//   plant_id?: number,
//   start?: Date | null,
//   end?: Date | null,
// ): Promise<AxiosResponse<>> {
//   const params = new URLSearchParams();

//   params.append("page", page.toString());
//   params.append("offset", "8");
//   if (start && end) {
//     params.append("start", start.toISOString().split("T")[0].toString());
//     params.append("end", end.toISOString().split("T")[0].toString());
//   }
//   if (property_id) params.append("property_id", property_id.toString());
//   if (lot_id) params.append("lot_id", lot_id.toString());
//   if (plant_id) params.append("plant_id", plant_id.toString());
//   params.append("Accept-Language", "pt");

//   return await api.get("/cultivation", { params });
// }
