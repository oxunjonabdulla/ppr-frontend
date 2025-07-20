import { useState } from "react";

// react-router-dom components
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import axios from "axios";

function SignUp() {
  const [agreement, setAgremment] = useState(true);

  const handleSetAgremment = () => setAgremment(!agreement);
  const [jshshir, setJshshir] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://api.ppr.vchdqarshi.uz/api/api/token/",
        {
          jshshir,
          password,
        });

      const access = response.data.access;   // ✅ Correct
      console.log('access : ', access);
      const refresh = response.data.refresh; // optional
      

      localStorage.setItem("token", access); // ✅ Store access token
      localStorage.setItem("refresh", refresh); // optional
      // Redirect to dashboard page
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(error.response?.data?.detail || "JSHSHIR yoki parol noto‘g‘ri.");
    }


  };

  return (
    <BasicLayout
      title="Xush kelibsiz!"
      description="Korxona uskunalarini boshqarish, texnik xizmat, nosozliklar va foydalanuvchilar nazorati uchun yagona tizim."
      image={curved6}
    >
      <Card>
        <br />
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            TIZIMGA KIRISH
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleLogin}>
            <SoftBox mb={2}>
              <SoftInput placeholder="JSHSHIR" value={jshshir} onChange={(e) => setJshshir(e.target.value)} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="PAROL" value={password}
                         onChange={(e) => setPassword(e.target.value)} />
            </SoftBox>
            {error && (
              <SoftTypography color="error" fontSize="small" mb={1}>
                {error}
              </SoftTypography>
            )}
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth type="submit">
                KIRISH
              </SoftButton>
            </SoftBox>
            <br />
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
