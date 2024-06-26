import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";

const TopRatedDoctors = async () => {
  const res = await fetch("http://localhost:5000/api/v1/doctor?page=1&limit=3");
  const { data: doctors } = await res.json();

  return (
    <Box
      sx={{
        my: 10,
        py: 30,
        backgroundColor: "rgba(20, 20 ,20, 0.1)",
        clipPath: "polygon(0 0, 100% 75%, 100% 100%, 0 75%)",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" fontWeight={700}>
          Our Top Rated Doctors
        </Typography>
        <Typography component="p" fontSize={18} fontWeight={400} mt={4}>
          Access to experts physicians and surgeons, advanced technologies
        </Typography>
        <Typography component="p" fontSize={18} fontWeight={400}>
          and top-quality surgery facilities right here!.
        </Typography>
      </Box>
      <Container
        sx={{
          margin: "30px auto",
        }}
      >
        <Grid container spacing={2}>
          {doctors.map((doctor: any) => (
            <Grid item key={doctor?.id} md={4}>
              <Card>
                <Box>
                  <Image
                    src={doctor?.profilePhoto}
                    width={500}
                    height={100}
                    alt="doctor profile"
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h1">
                    {doctor?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor?.qualification}, {doctor?.designation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    <AddLocationAltOutlinedIcon /> {doctor?.address}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "center",
                    px: 2,
                  }}
                >
                  <Button>Booked Now</Button>
                  <Button variant="outlined">View Profile</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Button
            sx={{
              marginTop: "20px",
            }}
            variant="outlined"
          >
            View more
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopRatedDoctors;
