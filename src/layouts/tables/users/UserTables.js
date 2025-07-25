import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import JournalTable from "layouts/tables/JournalTable";
import { useState } from "react";
import "layouts/tables/style.css";
import SoftBadge from "components/SoftBadge";
import SearchHeader from "../SearchHeader";
import ImageModal from "../ImageModal";
import userColumns from "./userColumns";

function UserTables() {
  const [searchQuery, setSearchQuery] = useState("");

  const formatRoleBadge = (role) => {
    const roleMap = {
      Superuser: { label: "Super Foydalanuvchi", color: "dark" },
      EquipmentMaster: { label: "Uskunalar ustasi", color: "info" },
      CompanyAdmin: { label: "Korxona Administratori", color: "primary" },
      EquipmentOperator: { label: "Uskunalar operatori", color: "warning" },
    };

    const badge = roleMap[role] || { label: "Noma'lum", color: "secondary" };

    return (
      <SoftBadge
        variant="gradient"
        badgeContent={badge.label}
        color={badge.color}
        size="xs"
        container
      />
    );
  };

  const formattedRows = (item) => ({

    "ID raqami": item.id,
    "Rasmi": item.image ? (
      <ImageModal src={`https://api.ppr.vchdqarshi.uz/${item.image}`} alt="Foydalanuvchi rasmi" />
    ) : "-",
    "Ism Familiya": item.name || "-",
    "Foydalanuvchi nomi": item.username || "-",
    "Roli": formatRoleBadge(item.role),
    "Korxona nomi": item.company?.name || "-",
    "Telefon raqami": item.phone_number || "-",
  });


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SearchHeader
              title="Foydalanuvchilar"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              hideAddButton
            />
            <SoftBox px={3} pb={3}>
              <JournalTable
                title="Foydalanuvchilar jadvali"
                apiEndpoint="https://api.ppr.vchdqarshi.uz/api/users/"
                columns={userColumns}
                searchQuery={searchQuery}
                formattedRows={formattedRows}
              />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default UserTables;
