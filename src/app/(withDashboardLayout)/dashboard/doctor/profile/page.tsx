"use client";

import AutoFileUploader from "@/components/forms/AutoFileUploader";
import {
  useGetSingleUserQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/userApi";
import { CloudUpload } from "@mui/icons-material";
import { Box, Container, styled, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import { useState } from "react";
import DoctorInformations from "./components/DoctorInformations";
import ProfileUpdateModal from "./components/ProfileUpdateModal";
import EditIcon from "@mui/icons-material/Edit";

export const StyleInformationBox = styled(Box)(({ theme }) => ({
  background: "#f4f7fe",
  borderRadius: theme.spacing(1),
  width: "45%",
  padding: "8px 16px",
  "& p": {
    fontWidth: 600,
  },
}));

const DoctorProfile = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { data, isLoading } = useGetSingleUserQuery({});
  const [updateMyProfile, { isLoading: updating }] =
    useUpdateMyProfileMutation();

  const fileUploaderHandler = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));
    const res = await updateMyProfile(formData);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <>
      <ProfileUpdateModal
        open={isOpenModal}
        setOpen={setIsOpenModal}
        id={data?.id}
      />
      <Container
        sx={{
          mt: 4,
        }}
      >
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <Box
              sx={{
                width: 350,
                overflow: "hidden",
                borderRadius: 1,
              }}
            >
              <Image
                width={350}
                height={400}
                src={data?.profilePhoto}
                alt="user profile"
              />
            </Box>
            <Box my={2}>
              {updating ? (
                <p>Uploading......</p>
              ) : (
                <AutoFileUploader
                  name="file"
                  label="Choose Your Profile"
                  icon={<CloudUpload />}
                  onFileUpload={fileUploaderHandler}
                  variant="text"
                />
              )}
            </Box>

            <Button
              sx={{
                mb: 2,
                width: "350px",
              }}
              onClick={() => setIsOpenModal(true)}
              endIcon={<EditIcon />}
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid xs={12} md={8}>
            <DoctorInformations data={data} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DoctorProfile;
