import PHFullScreenModal from "@/components/Shared/phModal/PHFullScreenModal";
import PHForms from "@/components/forms/PHForms";
import PHInput from "@/components/forms/PHInput";
import { useGetSingleDoctorQuery } from "@/redux/api/doctorApi";
import { FieldValues } from "react-hook-form";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
  const { data, isLoading } = useGetSingleDoctorQuery(id);

  const submitHandler = async (values: FieldValues) => {};

  return (
    <PHFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
      {isLoading ? (
        <p>Loading.............</p>
      ) : (
        <PHForms onSubmit={submitHandler} defaultValues={data}>
          <PHInput name="name" label="Name" />
        </PHForms>
      )}
    </PHFullScreenModal>
  );
};

export default ProfileUpdateModal;
