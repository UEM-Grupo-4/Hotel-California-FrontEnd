import { Container, Grid, styled } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import HomeSectionTitle from "../../../components/HomeSectionTitle/HomeSectionTitle";
import RoomCard from "./RoomCard";
import { useMapAmenitiesOnRoomType } from "../../../hooks/useMapAmenitiesOnRoomType";
import { useRooms } from "../../../api/rooms.hooks";

function RoomsCollection() {
  const { mapAmenitiesOnRoomType } = useMapAmenitiesOnRoomType();
  const { data: rooms = [] } = useRooms();
  const [current, setCurrent] = useState(0);

  return (
    <Container maxWidth="lg">
      <Grid
        container
        flexDirection="column"
        justifyContent={"space-evenly"}
        alignItems={"center"}
        textAlign={"center"}
        height={"100vh"}
        sx={{ ".carousel-slider": { overflow: "visible" } }}
      >
        <HomeSectionTitle title="ELEGANTE Y LUJOSO" subtitle="Habitaciones" />
        <Carousel
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          selectedItem={current}
          interval={10000}
          onChange={(index) => setCurrent(index)}
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <ArrowRight onClick={onClickHandler} sx={{ right: -20 }}>
                <ArrowForwardIosIcon />
              </ArrowRight>
            )
          }
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <ArrowLeft onClick={onClickHandler} sx={{ left: -20 }}>
                <ArrowBackIosNewIcon />
              </ArrowLeft>
            )
          }
        >
          {rooms.map((room, index) => (
            <RoomCard room={room} mapAmenitiesOnRoomType={mapAmenitiesOnRoomType} key={index} />
          ))}
        </Carousel>
      </Grid>
    </Container>
  );
}

export default RoomsCollection;

const ArrowBase = styled("div")({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 200000,
  cursor: "pointer",
  background: "rgba(0,0,0,0.4)",
  borderRadius: "50%",
  padding: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
});

const ArrowLeft = styled(ArrowBase)({});
const ArrowRight = styled(ArrowBase)({});
