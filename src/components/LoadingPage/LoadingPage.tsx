import { Backdrop, CircularProgress } from "@mui/material";

interface Props {
  open: boolean;
}

export function LoadingPage({ open }: Readonly<Props>) {
  return (
    <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
}
