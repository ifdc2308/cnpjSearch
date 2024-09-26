import { Grid, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Grid container sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          2024 &copy; Desenvolvido por Ítalo Dórea
        </Typography>
      </Grid>
    </Grid>
  );
};
