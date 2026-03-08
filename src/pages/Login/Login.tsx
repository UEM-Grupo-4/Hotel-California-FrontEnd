import { useState } from "react";
import { Container, Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useLogin } from "../../api/auth";

const Login = () => {
  const { mutate: loginMutate, isPending } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeInputs = (
    value: string,
    callback: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    callback(value);
  };

  const handleSubmit = () => {
    loginMutate({ email, password });
  };

  return (
    <Container maxWidth="md" sx={{ height: "100%" }}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Paper sx={{ p: 4, width: 400 }}>
          <Typography variant="h5" mb={2}>
            Login
          </Typography>

          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => handleChangeInputs(e.target.value, setEmail)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => handleChangeInputs(e.target.value, setPassword)}
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            disabled={isPending}
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            {isPending ? "Entrando..." : "Login"}
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
