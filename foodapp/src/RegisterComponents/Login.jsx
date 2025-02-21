import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import styles from "./register.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    alert("Login successful!");
    navigate("/food-list");
  };

  return (
    <div className={styles.register}>
      <Box component="form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            "& > :not(style)": { m: 1, width: "30ch" },
            input: { color: "#fff" },
            "& .MuiInputLabel-root": { color: "#fff" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#ff1a1a" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#fff" },
              "&:hover fieldset": { borderColor: "#ff1a1a" },
              "&.Mui-focused fieldset": { borderColor: "#ff1a1a" },
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& > :not(style)": { m: 1, width: "30ch" },
            input: { color: "#fff" },
            "& .MuiInputLabel-root": { color: "#fff" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#ff1a1a" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#fff" },
              "&:hover fieldset": { borderColor: "#ff1a1a" },
              "&.Mui-focused fieldset": { borderColor: "#ff1a1a" },
            },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "#ff1a1a",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "20px",
            "&:hover": { backgroundColor: "#cc0000" },
          }}
        >
          Login
        </Button>
        <p>
          Don't have an account?{" "}
          <RouterLink
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Link
              component="span"
              sx={{
                "&:hover": { color: "#ff1a1a" },
              }}
            >
              Sign up here
            </Link>
          </RouterLink>
        </p>
      </Box>
    </div>
  );
}
