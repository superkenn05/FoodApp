import { TextField } from "@mui/material";

export default function Username({ username, setUsername }) {
  return (
    <TextField
      label="Username"
      variant="outlined"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
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
