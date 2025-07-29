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
import AddUserModal from "./addUserModal";
import ActionMenu from "../ActionMenu";
import axiosInstance from "../../../axiosConfig";
import EditUserModal from "./EditUserModal";

function UserTables() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleSuccess = () => {
    window.location.reload(); // or re-fetch users via API
  };

  const [editOpen, setEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleDelete = (item) => {
    console.log("Delete clicked for ID:", item.id);
    if (window.confirm("Rostdan ham o'chirmoqchimisiz?")) {
      axiosInstance
        .delete(`user-delete/${item.id}/`)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("O‘chirishda xatolik yuz berdi:", error);
          alert("Xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring.");
        });
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditOpen(true);
  };
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
      <ImageModal src={item.image} alt="Foydalanuvchi rasmi" />
    ) : "-",
    "Ism Familya": item.name || "-",
    "Foydalanuvchi nomi": item.username || "-",
    "Roli": formatRoleBadge(item.role),
    "Korxona nomi": item.company?.name || "-",
    "Telefon raqami": item.phone_number || "-",
    "JSHSHIR raqami": item.jshshir || "-",
    ...(item.role === "Superuser"
    ? {}
    : {
        "Amallar": (
          <ActionMenu
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item)}
          />
        ),
      }),
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
              onAddClick={handleModalOpen}

            />
            <AddUserModal
              open={isModalOpen}
              onClose={handleModalClose}
              onSuccess={handleSuccess}
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
            <EditUserModal
              open={editOpen}
              onClose={() => setEditOpen(false)}
              item={selectedItem}
              onSuccess={() => window.location.reload()}
            />
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default UserTables;
