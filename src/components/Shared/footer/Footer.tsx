import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import facebookIcon from "@/assets/landing_page/facebook.png";
import twitterIcon from "@/assets/landing_page/twitter.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import linkedinIcon from "@/assets/landing_page/linkedin.png";
import Image from "next/image";

const Footer = () => {
  return (
    <Box bgcolor="rgb(17, 26, 34)" py={5}>
      <Container>
        <Stack direction="row" gap={4} justifyContent="center">
          <Typography color="#fff" component={Link} href="/consultation">
            Consultation
          </Typography>
          <Typography color="#fff">Medicine</Typography>
          <Typography color="#fff">Diagnostics</Typography>
          <Typography color="#fff">NGOs</Typography>
        </Stack>
        <Stack direction="row" gap={2} py={3} justifyContent="center">
          <Image src={facebookIcon} width={30} height={30} alt="facebook" />
          <Image src={instagramIcon} width={30} height={30} alt="facebook" />
          <Image src={twitterIcon} width={30} height={30} alt="facebook" />
          <Image src={linkedinIcon} width={30} height={30} alt="facebook" />
        </Stack>
        {/* <div className="border-b-[1px] border-dashed"></div> */}
        <Box
          sx={{
            border: "1px dashed lightgray",
          }}
        ></Box>
        <Stack
          direction="row"
          gap={2}
          py={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="p" color="#fff">
            &copy;2024 PH Health Care. All rights reserved
          </Typography>
          <Typography
            variant="h4"
            component={Link}
            href="/"
            fontWeight={600}
            color="#fff"
          >
            P
            <Box component="span" color="primary.main">
              H
            </Box>
            Health Care
          </Typography>
          <Typography component="p" color="#fff">
            Privacy policy ! Terms & conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
