import { Grid, styled, Typography } from "@mui/material";

interface Props {
  title: string;
  subtitle: string;
}

function HomeSectionTitle({ title, subtitle }: Readonly<Props>) {
  return (
    <Container container flexDirection={"column"} gap={3}>
      <Typography className="hc-hst-title" variant="h2" color="primary">
        {title}
      </Typography>
      <Typography className="hc-hst-subtitle" variant="h3">
        {subtitle}
      </Typography>
    </Container>
  );
}

export default HomeSectionTitle;

const Container = styled(Grid)({
  ".hc-hst-title": {
    fontSize: 26,
  },
  ".hc-hst-subtitle": {
    fontSize: 62,
    fontWeight: 500,
  },
});
