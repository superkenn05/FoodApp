import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Password({ password, setPassword }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      label="Password"
      type={showPassword ? "text" : "password"}
      variant="outlined"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? (
                  <VisibilityOff sx={{ color: "#fff" }} />
                ) : (
                  <Visibility sx={{ color: "#fff" }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
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
