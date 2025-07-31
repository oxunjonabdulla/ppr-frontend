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
import liftingCraneColumns from "./liftingCraneColumns";
import ImageModal from "../ImageModal";
import AddLiftingCraneModal from "./AddLiftingCraneModal";
import ActionMenu from "../ActionMenu";
import axiosInstance from "../../../axiosConfig";
import EditLatheMachineModal from "../latheMachine/EditLatheMachineModal";
import EditLiftingCraneModal from "./EditLiftingCraneModal";


function LiftingCraneTables() {
  const [searchQuery, setSearchQuery] = useState("");
  const formatUzbekDate = (dateString) => {
    if (!dateString) return "-";
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("uz-UZ", options);
  };

  const formatUzbekDateTime = (dateString) => {
    if (!dateString) return "-";
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleString("uz-UZ", options);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => setIsModalOpen(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleSuccess = () => {
    window.location.reload(); // or refresh data another way
  };
  const [editOpen, setEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleDelete = (item) => {
    console.log("Delete clicked for ID:", item.id);
    if (window.confirm("Rostdan ham o'chirmoqchimisiz?")) {
      axiosInstance
        .delete(`lifting_crane-detail/${item.id}/`)
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
  const formattedRows = (item) => ({
    "ID raqami": item.id,
    "Rasmi": item.image ? (
      <ImageModal src={item.image} alt="rasm" />
    ) : "-",
    "Korxona nomi": item.company_name || "-",
    "Detal nomi": item.detail_name || "-",
    "Ishlab chiqarilgan sana": formatUzbekDate(item.manufacture_date),
    "Zavod raqami": item.factory_number || "-",
    "Ro'yxat raqami": item.registration_number || "-",
    "O'rnatilgan joyi": item.installation_location || "-",
    "Holati": (
      <SoftBadge
        variant="gradient"
        badgeContent={
          item.technical_condition === "working"
            ? "Soz"
            : item.technical_condition === "faulty"
              ? "Nosoz"
              : "Noma'lum"
        }
        color={
          item.technical_condition === "working"
            ? "success"
            : item.technical_condition === "faulty"
              ? "error"
              : "secondary"
        }
        size="xs"
        container
      />
    ),
    "Mas'ul shaxs": item.responsible_person?.name || "-",
    "Kran osti yo‘li uzunligi": item.under_crane_path_length || "-",
    "Kran eni uzunligi": item.crane_width_length || "-",
    "Qo'shilgan vaqti": formatUzbekDateTime(item.created_at),
    "Yangilangan vaqti": formatUzbekDateTime(item.updated_at),
    "Amallar": (
      <ActionMenu
        onEdit={() => handleEdit(item)}
        onDelete={() => handleDelete(item)}
      />
    ),
  });


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SearchHeader
              title="Yuk ko'tarish kranlari"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onAddClick={handleModalOpen}
            />
            <AddLiftingCraneModal
              open={isModalOpen}
              onClose={handleModalClose}
              onSuccess={handleSuccess}
            />
            <SoftBox px={3} pb={3}>
              <JournalTable
                title="Yuk ko'tarish kranlari jadvali"
                apiEndpoint="lifting_crane-list-create/"
                columns={liftingCraneColumns}
                searchQuery={searchQuery}
                formattedRows={formattedRows}
              />
            </SoftBox>
            <EditLiftingCraneModal
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

export default LiftingCraneTables;



