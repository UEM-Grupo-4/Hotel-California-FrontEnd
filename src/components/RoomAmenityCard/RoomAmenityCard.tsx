import { Card, CardContent, Typography, IconButton, Grid } from "@mui/material";
import type { Amenity } from "../../types/rooms";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  amenity: Amenity;
  onEdit: (amenity: Amenity) => void;
  onDelete: (amenity: Amenity) => void;
};

export function AmenityCard({ amenity, onEdit, onDelete }: Readonly<Props>) {
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

          <IconButton size="small" color="error" onClick={() => onDelete(amenity)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </CardContent>
    </Card>
  );
}
