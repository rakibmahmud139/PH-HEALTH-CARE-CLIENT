import PHModal from "@/components/Shared/phModal/PHModal";
import PHFileUploader from "@/components/forms/PHFileUploader";
import PHForms from "@/components/forms/PHForms";
import PHInput from "@/components/forms/PHInput";
import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type IProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialtyModal = ({ open, setOpen }: IProps) => {
  const [createSpecialty] = useCreateSpecialtyMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);

    try {
      const res = await createSpecialty(data).unwrap();
      console.log(res);

      if (res?.id) {
        toast.success("Specialty Created Successfully!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };
  return (
    <PHModal open={open} setOpen={setOpen} title="Create Specialties">
      <PHForms onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <PHInput name="title" label="Title" />
          </Grid>
          <Grid item md={6}>
            <PHFileUploader name="file" label="" />
          </Grid>
        </Grid>
        <Button
          sx={{
            mt: 1,
          }}
          type="submit"
        >
          Create
        </Button>
      </PHForms>
    </PHModal>
  );
};

export default SpecialtyModal;
