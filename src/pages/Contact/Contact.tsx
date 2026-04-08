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

import Background from "../../assets/swimming-background.jpg";
import { useOpenConversation } from "../../api/rooms.hooks";
import { useNavigate } from "react-router-dom";
import type { ConversationChat } from "../../types/messages";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  reservationCode?: string;
}

const initialFormData: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  reservationCode: "",
};

const subjectOptions = [
  "Consulta sobre reserva",
  "Disponibilidad de habitaciones",
  "Modificación de reserva",
  "Cancelación",
  "Otro",
];

export default function ContactForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const { mutate: openConversationMutation } = useOpenConversation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "El nombre es obligatorio";
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es obligatorio";

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Introduce un email válido";
    }

    if (formData.phone && !/^\+?[\d\s\-().]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Número inválido";
    }

    if (!formData.subject) newErrors.subject = "Selecciona un motivo";
    if (!formData.message.trim()) newErrors.message = "El mensaje es obligatorio";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!validate()) return;

    openConversationMutation(
      { user_email: formData.email, initial_message: formData.message },
      {
        onSuccess: (response) => {
          const data = response?.data as ConversationChat;

          navigate(`/chat?email=${formData.email}&conversationId=${data?.id}`);
        },
      },
    );
  };

  const isDisabled =
    !formData.firstName || !formData.lastName || !formData.email || !formData.message;

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
      {/* overlay */}
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

          {isSubmitted && (
            <Alert severity="success" sx={{ mb: 3 }} onClose={() => setIsSubmitted(false)}>
              ¡Solicitud iniciada! Te responderemos por chat en breve.
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              {/* Nombre + Apellido */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Nombre"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Apellido"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
                />
              </Grid>

              {/* Email + Teléfono */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone || "Ej: +34 600 123 456"}
                />
              </Grid>

              {/* Código de reserva */}
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Código de reserva (opcional)"
                  name="reservationCode"
                  value={formData.reservationCode}
                  onChange={handleChange}
                />
              </Grid>

              {/* Motivo */}
              <Grid size={12}>
                <TextField
                  fullWidth
                  required
                  select
                  label="Motivo"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  error={Boolean(errors.subject)}
                  helperText={errors.subject}
                >
                  {subjectOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Mensaje */}
              <Grid size={12}>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={5}
                  label="Mensaje"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={Boolean(errors.message)}
                  helperText={errors.message}
                />
              </Grid>

              {/* CTA */}
              <Grid size={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isDisabled}
                  endIcon={<SendIcon />}
                  color="primary"
                >
                  Iniciar solicitud
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
