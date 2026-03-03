import { Container, styled } from "@mui/material";

const Home = () => {
  return (
    <HomeBackground>
      <Container maxWidth="md">
        <h1>Home</h1>
      </Container>
    </HomeBackground>
  );
};

export default Home;

const HomeBackground = styled("section")({
  width: "100%",
  height: "600px",
  backgroundImage: 'url("https://placehold.co/600x350?text=.")',
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
});
