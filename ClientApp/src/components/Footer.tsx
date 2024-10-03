import { Grid, Typography, Link } from "@mui/material";

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
          2024 &copy; Desenvolvido por&nbsp;
          <Link
            href="https://ifdc2308.github.io/portfolio-italo/"
            underline="none"
            color={"#000"}
            sx={{ fontWeight: 600 }}
          >
            Ítalo Dórea
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};
