"use client";

import assets from "@/assets";
import PHForms from "@/components/forms/PHForms";
import PHInput from "@/components/forms/PHInput";
import { loginUser } from "@/services/actions/loginUser";
import { registerPatient } from "@/services/actions/registerPatient";
import { storeUserInfo } from "@/services/auth.services";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const patientValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter your email!"),
  contactNumber: z
    .string()
    .regex(/^\d{11}$/, "Please entre your contact number!"),
  address: z.string().min(1, "Please enter your address!"),
});

export const validationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters!"),
  patient: patientValidationSchema,
});

export const defaultValues = {
  password: "",
  patient: {
    name: "",
    email: "",
    contactNumber: "",
    address: "",
  },
};

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);

    try {
      const res = await registerPatient(data);
      if (res?.data?.id) {
        toast.success(res?.message);
        const result = await loginUser({
          password: values.password,
          email: values.patient.email,
        });
        if (result?.data?.accessToken) {
          toast.success(result?.message);
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            padding: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} alt="logo" width={50} height={50} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={600} mt={1}>
                Patient Register
              </Typography>
            </Box>
          </Stack>
          <Box>
            <PHForms
              onSubmit={handleRegister}
              resolver={zodResolver(validationSchema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <PHInput
                    label="Name"
                    fullWidth={true}
                    name="patient.name"
                    // required={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="patient.email"
                    // required={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                    // required={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Contact number"
                    type="tel"
                    fullWidth={true}
                    name="patient.contactNumber"
                    // required={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Address"
                    fullWidth={true}
                    name="patient.address"
                    // required={true}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth={true}
                sx={{
                  marginY: "10px",
                }}
                type="submit"
              >
                Register
              </Button>
              <Typography component="p" fontWeight={300} mt={1}>
                Do you already have an account? <Link href="/login">Login</Link>
              </Typography>
            </PHForms>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
