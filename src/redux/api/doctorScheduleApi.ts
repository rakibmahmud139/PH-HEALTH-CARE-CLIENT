import { TMeta } from "@/types";
import { tagTypes } from "../tags-type";
import { baseApi } from "./baseApi";

const doctorScheduleAPi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctorSchedule: build.mutation({
      query: (data) => ({
        url: "/doctor-schedule",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.doctorSchedule],
    }),

    getAllDoctorSchedule: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/doctor-schedule",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          schedules: response,
          meta,
        };
      },
      providesTags: [tagTypes.doctorSchedule],
    }),
  }),
});

export const { useCreateDoctorScheduleMutation, useGetAllDoctorScheduleQuery } =
  doctorScheduleAPi;
