import { Box, Stack, Typography } from "@mui/material";
import { StyleInformationBox } from "../page";

type TProps = {
  data: any;
};

const DoctorInformations = ({ data }: TProps) => {
  return (
    <>
      <Typography variant="h5" mb={2} color="primary.main">
        Basic Information
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} gap={2} flexWrap={"wrap"}>
        <StyleInformationBox>
          <Typography variant="caption" color="secondary">
            Role
          </Typography>
          <Typography>{data?.role}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography variant="caption" color="secondary">
            Name
          </Typography>
          <Typography>{data?.name}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography variant="caption" color="secondary">
            Email
          </Typography>
          <Typography>{data?.email}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography variant="caption" color="secondary">
            Gender
          </Typography>
          <Typography>{data?.gender}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography variant="caption" color="secondary">
            Designation
          </Typography>
          <Typography>{data?.designation}</Typography>
        </StyleInformationBox>
      </Stack>

      <Typography mb={2} mt={2} variant="h5" color="primary.main">
        Professional Information
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} gap={2} flexWrap={"wrap"}>
        <StyleInformationBox>
          <Typography variant="caption" color="secondary">
            Appointment Fee
          </Typography>
          <Typography>{data?.appointmentFee}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography variant="caption" color="secondary">
            Qualification
          </Typography>
          <Typography>{data?.qualification}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography variant="caption" color="secondary">
            Current Working Place
          </Typography>
          <Typography>{data?.currentWorkingPlace}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography variant="caption" color="secondary">
            Current Status
          </Typography>
          <Typography>{data?.status}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography variant="caption" color="secondary">
            Average Ratting
          </Typography>
          <Typography>{data?.averageRating}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography variant="caption" color="secondary">
            Experience
          </Typography>
          <Typography>{data?.experience}</Typography>
        </StyleInformationBox>
      </Stack>
    </>
  );
};

export default DoctorInformations;
