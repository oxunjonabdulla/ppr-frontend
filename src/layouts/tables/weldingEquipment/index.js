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
import weldingEquipmentColumns from "./weldingEquipmentColumns";
import ImageModal from "../ImageModal";
import Switch from "@mui/material/Switch";
import axios from "axios";
import AddWeldingEquipmentModal from "./AddWeldingEquipmentModal";

function WeldingEquipmentTables() {
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => setIsModalOpen(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleSuccess = () => {
    window.location.reload(); // or refresh data another way
  };

  const formatUzbekDate = (dateString) => {
    if (!dateString) return "-";
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("uz-UZ", options);
  };
  const handleToggleConservation = (id) => {
    axios.post(`/api/conservation-toggle/${id}/`)
      .then(() => {
        // optionally refresh table or update local state
      })
      .catch((err) => {
        console.error("Toggle failed", err);
      });
  };

  const formatUzbekDateTime = (dateString) => {
    if (!dateString) return "-";
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleString("uz-UZ", options);
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
          item.technical_condition === "working" ? "Soz" :
            item.technical_condition === "faulty" ? "Nosoz" :
              "Noma'lum"
        }
        color={
          item.technical_condition === "working" ? "success" :
            item.technical_condition === "faulty" ? "error" :
              "secondary"
        }
        size="xs"
        container
      />
    ),
    "Mas'ul shaxs": item.responsible_person || "-",
    "Konservatsiyaga olish": (
      <Switch
        checked={Boolean(item.conservation_date)}
        onChange={() => handleToggleConservation(item.id)}
        color="success"
      />
    ),

    "Konservatsiya sababi": item.conservation_reason || "-",
    "Qo'shilgan vaqti": formatUzbekDateTime(item.created_at),
    "Yangilangan vaqti": formatUzbekDateTime(item.updated_at),
  });


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SearchHeader
              title="Payvandlash qurilmalari"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onAddClick={handleModalOpen}
            />
            <AddWeldingEquipmentModal
              open={isModalOpen}
              onClose={handleModalClose}
              onSuccess={handleSuccess}
            />
            <SoftBox px={3} pb={3}>
              <JournalTable
                title="Payvandlash qurilmalari jadvali"
                apiEndpoint="https://api.ppr.vchdqarshi.uz/api/welding_equipment-list-create/"
                columns={weldingEquipmentColumns}
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

export default WeldingEquipmentTables;



