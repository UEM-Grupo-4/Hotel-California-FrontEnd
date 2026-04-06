import { Grid, styled, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

function Reviews() {
  return (
    <Container container gap={2} alignItems={"center"}>
      <Typography className="hc-review-value">
        +6.4K <span className="hc-review-description">Bookings</span>
      </Typography>
      <Grid container alignItems={"center"}>
        <StarIcon color="primary" fontSize="small" sx={{ pl: "2px", pr: "4px" }} />
        <Typography className="hc-review-value">
          4.9/5 <span className="hc-review-description">Reviews</span>
        </Typography>
      </Grid>
    </Container>
  );
}

const Container = styled(Grid)({
  position: "absolute",
  right: "10%",
  bottom: 20,
  ".hc-review-value": {
    fontWeight: "bold",
    fontSize: "20px",
  },
  ".hc-review-description": {
    fontSize: "14px",
    fontWeight: "normal",
  },
});

export default Reviews;
