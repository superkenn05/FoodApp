import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Email from "./Email";
import Password from "./Password";
import styles from "./register.module.css";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showAlert("Please fill in all fields!", "warning");
      return;
    }

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      showAlert("Login successful!", "success");
      setTimeout(() => navigate("/food-list"), 2000);
    } catch (error) {
      console.error("Login error:", error.message);
      showAlert("Invalid email or password!", "danger");
    }
  };

  return (
    <div className={styles.register}>
      {/* Alert Box */}
      {alert && (
        <Alert
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor:
              alert.type === "success"
                ? "#4CAF50"
                : alert.type === "warning"
                ? "#FF9407"
                : "#F44336",
            color: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            minWidth: "280px",
            display: "flex",
            alignItems: "center",
          }}
          startDecorator={
            alert.type === "success" ? (
              <CheckCircleIcon />
            ) : alert.type === "warning" ? (
              <WarningIcon />
            ) : (
              <ReportIcon />
            )
          }
          variant="solid"
          color={alert.type}
          endDecorator={
            <IconButton onClick={() => setAlert(null)} sx={{ color: "#fff" }}>
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <Typography level="body-sm">{alert.message}</Typography>
        </Alert>
      )}

      {/* Form */}
      <Box component="form" onSubmit={handleLogin}>
        <h1>Login</h1>

        <Email email={email} setEmail={setEmail} />
        <Password password={password} setPassword={setPassword} />
        <div className={styles.registerButton}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#ff1a1a",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "20px",
              width: "100%",  
              maxWidth: "250px", 
              height: "45px", 
              "&:hover": { backgroundColor: "#cc0000" },
            }}
          >
            Login
          </Button>
        </div>
        <p>
          Don't have an account?{" "}
          <Link
            component={RouterLink}
            to="/register"
            sx={{ "&:hover": { color: "#ff1a1a" } }}
          >
            Sign up here
          </Link>
        </p>
      </Box>
    </div>
  );
}
