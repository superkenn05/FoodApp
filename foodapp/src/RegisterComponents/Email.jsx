import { TextField } from "@mui/material";

export default function Email({ email, setEmail }) {
  return (
    <TextField
      label="Email"
      type="email"
      variant="outlined"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      sx={{
        width: "100%",
        maxWidth: "300px",
        input: { color: "#fff" },
        "& .MuiInputLabel-root": { color: "#fff" },
        "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#fff" },
          "&:hover fieldset": { borderColor: "#ff1a1a" },
          "&.Mui-focused fieldset": { borderColor: "#fff" },
        },
      }}
    />
  );
}

