import { Card, CardContent, Typography, IconButton, Grid } from "@mui/material";
import type { RoomType } from "../../types/rooms";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  amenity: RoomType;
  onEdit: (amenity: RoomType) => void;
};

export function AmenityCard({ amenity, onEdit }: Readonly<Props>) {
  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: "12px !important",
          p: 1.5,
        }}
      >
        <Typography variant="body1" fontWeight={"bold"}>
          {amenity.name}
        </Typography>

        <Grid container gap={1}>
          <IconButton size="small" onClick={() => onEdit(amenity)}>
            <EditIcon />
          </IconButton>

          <IconButton size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </CardContent>
    </Card>
  );
}
