import { Button, Grid, Typography } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  title: string;
  onCreate?: () => void;
  createLabel?: string;
  isEmpty?: boolean;
  children: ReactNode;
};

export function AdminSection({ title, createLabel, isEmpty, onCreate, children }: Readonly<Props>) {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" my={2}>
        <Typography variant="h6">{title}</Typography>

        {onCreate && (
          <Button variant="contained" size="small" onClick={onCreate}>
            {createLabel ?? `Nuevo ${title}`}
          </Button>
        )}
      </Grid>
      {isEmpty ? <Typography>{`No hay ${title} creadas`}</Typography> : children}
    </>
  );
}
