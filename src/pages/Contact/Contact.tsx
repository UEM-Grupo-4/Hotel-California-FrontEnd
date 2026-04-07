import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  Alert,
  MenuItem,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import Background from "../../assets/umbrella-deck-chair-around-outdoor-swimming-pool-hotel-resort-with-sea-ocean-beach-coconut-palm-tree.jpg";

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}

const initialFormData: FormData = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  asunto: "",
  mensaje: "",
};

const opcionesAsunto = [
  "Consulta sobre reserva",
  "Disponibilidad de habitaciones",
  "Modificación de reserva",
  "Cancelación",
  "Otro",
];

export default function FormularioContacto() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [enviado, setEnviado] = useState(false);
  const [errores, setErrores] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: "" }));
  };

  const validar = (): boolean => {
    const nuevosErrores: Partial<FormData> = {};

    if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!formData.apellido.trim()) nuevosErrores.apellido = "El apellido es obligatorio";

    // ✅ REGEX CORREGIDO
    if (!formData.email.trim()) {
      nuevosErrores.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = "Introduce un email válido";
    }

    // ✅ REGEX CORREGIDO
    if (formData.telefono && !/^\+?[\d\s\-().]{7,15}$/.test(formData.telefono)) {
      nuevosErrores.telefono = "Número inválido";
    }

    if (!formData.asunto) nuevosErrores.asunto = "Selecciona un asunto";
    if (!formData.mensaje.trim()) nuevosErrores.mensaje = "El mensaje es obligatorio";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;

    console.log("Formulario enviado:", formData);

    setEnviado(true);
    setFormData(initialFormData);
  };

  const isDisabled =
    !formData.nombre || !formData.apellido || !formData.email || !formData.mensaje;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* overlay moderno */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.65))",
          backdropFilter: "blur(2px)",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <Paper
          elevation={12}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background: "rgba(255,255,255,0.96)",
          }}
        >
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Contacto & Reservas
          </Typography>

          <Typography color="text.secondary" mb={3}>
            ¿Tienes dudas o quieres reservar? Escríbenos y te ayudamos en minutos.
          </Typography>

          <Divider sx={{ mb: 4 }} />

          {enviado && (
            <Alert
              severity="success"
              sx={{ mb: 3 }}
              onClose={() => setEnviado(false)}
            >
              ¡Solicitud enviada! Nuestro equipo te responderá pronto.
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Nombre"
                  name="nombre"
                  autoComplete="given-name"
                  value={formData.nombre}
                  onChange={handleChange}
                  error={Boolean(errores.nombre)}
                  helperText={errores.nombre}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Apellido"
                  name="apellido"
                  autoComplete="family-name"
                  value={formData.apellido}
                  onChange={handleChange}
                  error={Boolean(errores.apellido)}
                  helperText={errores.apellido}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(errores.email)}
                  helperText={errores.email}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  error={Boolean(errores.telefono)}
                  helperText={errores.telefono || "Ej: +34 600 123 456"}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  select
                  label="Motivo"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  error={Boolean(errores.asunto)}
                  helperText={errores.asunto}
                >
                  {opcionesAsunto.map((opcion) => (
                    <MenuItem key={opcion} value={opcion}>
                      {opcion}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={5}
                  label="Mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  error={Boolean(errores.mensaje)}
                  helperText={errores.mensaje}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isDisabled}
                  endIcon={<SendIcon />}
                  sx={{
                    py: 1.6,
                    fontWeight: 700,
                    borderRadius: 3,
                    backgroundColor: "#E3A72F",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#cf9528",
                      transform: "translateY(-2px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  Enviar solicitud
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}