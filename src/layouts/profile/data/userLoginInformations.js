import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig";

// Example data


function LoginLogsCard() {
  const [login_logs, setLoginLogs] = useState([]);

  useEffect(() => {
    axiosInstance.get("https://api.ppr.vchdqarshi.uz/api/user/login-logs/")
      .then((res) => setLoginLogs(res.data.results));
  }, [login_logs]);
  return (
    <Card sx={{ height: "100%", p: 2 }}>
      <SoftBox display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <SoftTypography variant="h6" fontWeight="medium">
          Kirish maʼlumotlari
        </SoftTypography>
      </SoftBox>

      <Divider sx={{ mb: 2 }} />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {["T/r", "Kirilgan vaqti", "Qurilma"].map((header) => (
                <TableCell key={header} sx={{ fontWeight: "bold", fontSize: "0.8rem", color: "#6c757d" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {login_logs.map((log) => (
              <TableRow key={log.id} hover>
                <TableCell sx={{ fontSize: "0.875rem" }}>{log.id}</TableCell>
                <TableCell sx={{ fontSize: "0.875rem" }}>{log.time}</TableCell>
                <TableCell sx={{ fontSize: "0.875rem", wordBreak: "break-word" }}>{log.device}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default LoginLogsCard;
