import PHFullScreenModal from "@/components/Shared/phModal/PHFullScreenModal";
import PHForms from "@/components/forms/PHForms";
import PHInput from "@/components/forms/PHInput";
import PHSelectField from "@/components/forms/PHSelectField";
import {
  useGetSingleDoctorQuery,
  useUpdateDoctorMutation,
} from "@/redux/api/doctorApi";
import { Gender } from "@/types";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import MultipleSelectChip from "./MultipleSelectChip";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const validationSchema = z.object({
  experience: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce.number().int().optional()
  ),
  appointmentFee: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce.number().int().optional()
  ),
  name: z.string().optional(),
  contactNumber: z.string().optional(),
  registrationNumber: z.string().optional(),
  gender: z.string().optional(),
  qualification: z.string().optional(),
  currentWorkingPlace: z.string().optional(),
  designation: z.string().optional(),
});

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
  const { data, isLoading, refetch, isSuccess } = useGetSingleDoctorQuery(id);
  const { data: allSpecialties } = useGetAllSpecialtiesQuery({});

  const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState([]);
  const [updateDoctor, { isLoading: updating }] = useUpdateDoctorMutation();

  useEffect(() => {
    if (!isSuccess) return;
    setSelectedSpecialtiesIds(
      data?.doctorSpecialties.map((sp: any) => sp.specialtiesId)
    );
  }, [isSuccess, data?.doctorSpecialties]);

  const submitHandler = async (values: FieldValues) => {
    const specialties = selectedSpecialtiesIds.map((specialtiesId: string) => ({
      specialtiesId,
      isDeleted: false,
    }));

    const excludedFields: Array<keyof typeof values> = [
      "email",
      "id",
      "role",
      "needPasswordChange",
      "status",
      "createdAt",
      "updatedAt",
      "isDeleted",
      "averageRating",
      "review",
      "profilePhoto",
      "registrationNumber",
      "schedules",
      "doctorSpecialties",
    ];

    const updatedData = Object.fromEntries(
      Object.entries(values).filter(([key]) => {
        return !excludedFields.includes(key);
      })
    );

    updatedData.specialties = specialties;

    try {
      const res = await updateDoctor({ body: updatedData, id }).unwrap();
      if (res?.id) {
        toast.success("Doctor Updated Successfully!!");
      }
      refetch();
      setOpen(false);
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  return (
    <PHFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
      {isLoading ? (
        <p>Loading.............</p>
      ) : (
        <PHForms
          onSubmit={submitHandler}
          defaultValues={data}
          resolver={zodResolver(validationSchema)}
        >
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput name="name" label="Name" sx={{ mb: 2 }} fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="email"
                type="email"
                label="Email"
                sx={{ mb: 2 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="contactNumber"
                label="Contract Number"
                sx={{ mb: 2 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="address"
                label="Address"
                sx={{ mb: 2 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="registrationNumber"
                label="Registration Number"
                sx={{ mb: 2 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="experience"
                type="number"
                label="Experience"
                sx={{ mb: 2 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHSelectField
                items={Gender}
                name="gender"
                label="Gender"
                sx={{ mb: 2 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="appointmentFee"
                type="number"
                label="AppointmentFee"
                sx={{ mb: 2 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="qualification"
                label="Qualification"
                sx={{ mb: 2 }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="currentWorkingPlace"
                label="Current Working Place"
                sx={{ mb: 2 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="designation"
                label="Designation"
                sx={{ mb: 2 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <MultipleSelectChip
                allSpecialties={allSpecialties}
                selectedIds={selectedSpecialtiesIds}
                setSelectedIds={setSelectedSpecialtiesIds}
              />
            </Grid>
          </Grid>
          <Button type="submit" disabled={updating}>
            Save
          </Button>
        </PHForms>
      )}
    </PHFullScreenModal>
  );
};

export default ProfileUpdateModal;
