import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import db from "../firebase";
import styles from "./register.module.css";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Username from "./Username";
import Email from "./Email";
import Password from "./Password";
import ConfirmPassword from "./ConfirmPassword";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if (!username || !email || !password || !confirmPassword) {
      showAlert("All fields are required!", "warning");
      return;
    }
    if (username.length < 3) {
      showAlert("Username: 3+ chars required!", "danger");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      showAlert("Invalid email format!", "danger");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      showAlert("Password must contain at least one uppercase letter!", "danger");
      return;
    }
    if (!/\d/.test(password)) {
      showAlert("Password must contain at least one number!", "danger");
      return;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      showAlert("Password must contain at least one special character (!@#$%^&*)!", "danger");
      return;
    }
    if (password.length < 8) {
      showAlert("Password must be at least 8 characters!", "danger");
      return;
    }
    if (password !== confirmPassword) {
      showAlert("Passwords do not match!", "danger");
      return;
    }
  
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email.toLowerCase(), password);
      const user = userCredential.user;
  
      const usersRef = collection(db, "userInfo");
      await setDoc(doc(usersRef, user.uid), {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        uid: user.uid,
        createdAt: new Date(),
      });
  
      showAlert("Registration successful!", "success");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Error:", error.message);
      if (error.code === "auth/email-already-in-use") {
        showAlert("Email already in use!", "danger");
      } else {
        showAlert("Registration failed!", "danger");
      }
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
      <Box component="form" onSubmit={handleSignUp}>
        <h1>Register</h1>

        <Username username={username} setUsername={setUsername} />
        <Email email={email} setEmail={setEmail} />
        <Password password={password} setPassword={setPassword} />
        <ConfirmPassword
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          password={password}
        />

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
            Sign Up
          </Button>
        </div>

        <p>
          Have an account?{" "}
          <Link
            component={RouterLink}
            to="/login"
            sx={{ "&:hover": { color: "#ff1a1a" } }}
          >
            Login here
          </Link>
        </p>
      </Box>
    </div>
  );
}
