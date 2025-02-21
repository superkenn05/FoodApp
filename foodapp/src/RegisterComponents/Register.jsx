import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { collection, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from "../firebase";
import styles from "./register.module.css";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields!");
      return;
    }
    if (username.length < 3) {
      alert("Username must be at least 3 characters long!");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long, with 1 uppercase letter, 1 number, and 1 special character."
      );
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const usersRef = collection(db, "userInfo");
      const usernameLower = username.toLowerCase();
      const emailLower = email.toLowerCase();

      // Check if username already exists
      const usernameQuery = query(usersRef, where("username", "==", usernameLower));
      const usernameSnapshot = await getDocs(usernameQuery);
      if (!usernameSnapshot.empty) {
        alert("Username already exists! Please choose another.");
        return;
      }

      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, emailLower, password);
      const user = userCredential.user;

      // Store user details in Firestore without storing password
      await setDoc(doc(db, "userInfo", user.uid), {
        username: usernameLower,
        email: emailLower,
      });

      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error.message);
      if (error.code === "auth/email-already-in-use") {
        alert("Email is already in use. Try logging in instead.");
      } else if (error.code === "auth/weak-password") {
        alert("Password is too weak! Please use a stronger password.");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={styles.register}>
      <Box component="form" onSubmit={handleSignUp}>
        <h1>Register</h1>

        <TextField
          label="Username"
          variant="outlined"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
            border: "none",
            outline: "none",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#cc0000" },
            "&:focus": { boxShadow: "0 0 8px rgba(255, 26, 26, 0.6)" },
          }}
        >
          Sign Up
        </Button>
        <p>
          Have already an account?{" "}
          
          <Link
            component={RouterLink}
            to="/login"
            color="inherit"
            sx={{
              "&:hover": { color: "#ff1a1a" },
            }}
          >
            Login here
          </Link>
        </p>
      </Box>
    </div>
  );
}
