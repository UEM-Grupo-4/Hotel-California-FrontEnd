import { Container, Grid, Typography } from "@mui/material";
import { commonAmenities } from "../../../mocks/dataMock";
import HomeSectionTitle from "../../../components/HomeSectionTitle/HomeSectionTitle";

function AmenitiesCollection() {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        flexDirection="column"
        justifyContent={"space-evenly"}
        alignItems={"center"}
        textAlign={"center"}
        height={"80vh"}
      >
        <HomeSectionTitle title="Moderno y cómodo" subtitle="Facilidades y Aménities" />
        <Grid container gap={8} width={"100%"} alignItems={"center"} justifyContent={"center"}>
          {commonAmenities.map((amenity, index) => (
            <Grid container gap={1} size={{ xs: 12, sm: 3 }} key={index}>
              <Grid size="auto" height={"100%"}>
                <amenity.icon color="primary" fontSize="large" />
              </Grid>
              <Grid container size={10} flexDirection="column" gap={1}>
                <Typography variant="h5" fontWeight={"bold"}>
                  {amenity.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {amenity.description}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default AmenitiesCollection;
