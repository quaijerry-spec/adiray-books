import { signupUser } from "../services/authService";

const handleSignup = async () => {
  try {
    await signupUser(email, password);
  } catch (error) {
    alert(error.message);
  }
};
