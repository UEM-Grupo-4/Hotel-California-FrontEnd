import { Card, CardContent, Typography, Button } from "@mui/material";
import type { Amenity } from "../../types/rooms";

type Props = {
  amenity: Amenity;
  onEdit?: (amenity: Amenity) => void;
};

export function AmenityCard({ amenity, onEdit }: Readonly<Props>) {
  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1.5,
        }}
      >
        <Typography variant="body2">{amenity.name}</Typography>

        {onEdit && (
          <Button size="small" onClick={() => onEdit(amenity)}>
            Editar
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
