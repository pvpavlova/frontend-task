import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/api";
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { Alert } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Пожалуйста, введите корректный email.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginRequest(email, password);

      const { token, user } = response.data;

      dispatch(login({ token, user }));

      localStorage.setItem("token", token);

      navigate("/profile");
    } catch (error) {
      console.error(error);
      setError("Ошибка входа. Неверный email или пароль.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Вход
      </Typography>
      <TextField
        label="Email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        autoComplete="off"
      />
      <TextField
        label="Пароль"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        autoComplete="off"
      />
      <Button
        variant="contained"
        onClick={handleLogin}
        fullWidth
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Войти"}
      </Button>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert
          onClose={() => setError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
