import { resetPassword } from "../services/authService";

const handleReset = async () => {
  try {
    await resetPassword(email);
  } catch (error) {
    alert(error.message);
  }
};
