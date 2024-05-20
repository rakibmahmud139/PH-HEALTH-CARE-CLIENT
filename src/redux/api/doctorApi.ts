import { IDoctor } from "@/types/doctor";
import { tagTypes } from "../tags-type";
import { baseApi } from "./baseApi";
import { TMeta } from "@/types";

const doctorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctor: build.mutation({
      query: (data) => ({
        url: "/user/create-doctor",
        method: "POST",
        contentType: "multipart/form-data",
        data: data,
      }),
      invalidatesTags: [tagTypes.doctor],
    }),

    getAllDoctor: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/doctor",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IDoctor[], meta: TMeta) => {
        return {
          doctors: response,
          meta,
        };
      },
      providesTags: [tagTypes.doctor],
    }),

    deleteDoctor: build.mutation({
      query: (id) => ({
        url: `/doctor/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.doctor],
    }),

    getSingleDoctor: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/doctor/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctor],
    }),

    updateDoctor: build.mutation({
      query: (data) => ({
        url: `/doctor/${data?.id}`,
        method: "PATCH",
        data: data?.body,
      }),
      invalidatesTags: [tagTypes.doctor, tagTypes.user],
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllDoctorQuery,
  useDeleteDoctorMutation,
  useGetSingleDoctorQuery,
  useUpdateDoctorMutation,
} = doctorApi;
