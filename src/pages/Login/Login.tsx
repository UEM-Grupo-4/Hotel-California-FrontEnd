import { useState } from "react";
import { Container, Box, Typography, TextField, Button, Paper, styled } from "@mui/material";
import { useLogin } from "../../api/auth";
import LoginBackgroundImage from "../../assets/LoginBackground.jpeg";

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
    <LoginBackground>
      <Container maxWidth="md" sx={{ height: "100%" }}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
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
    </LoginBackground>

  );
};

const LoginBackground = styled("section")({
  width: "100%",
  height: "100%",
  backgroundImage: `url(${LoginBackgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
});

export default Login;
