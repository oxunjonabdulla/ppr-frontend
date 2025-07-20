import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import JournalTable from "layouts/tables/JournalTable";
import { useState } from "react";
import "layouts/tables/style.css";
import SoftBadge from "components/SoftBadge";
import maintenanceScheduleColumns from "./maintenanceScheduleColumns";
import MaintenanceHeader from "../maintenanceHeader";
import AddMaintenanceModal from "./AddMaintenanceModal";


function MaintenanceScheduleTables() {
  const [searchQuery, setSearchQuery] = useState("");
  const formatUzbekDate = (dateString) => {
    if (!dateString) return "-";
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("uz-UZ", options);
  };
   const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => setIsModalOpen(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleSuccess = () => {
    window.location.reload(); // or refresh data another way
  };
  const formatUzbekDateTime = (dateString) => {
    if (!dateString) return "-";
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleString("uz-UZ", options);
  };

  const maintenanceTypeUz = (type) => {
    const types = {
      inspection: "Texnik ko‘rik",
      full_inspection: "To‘liq texnik ko‘rik",
      partial_inspection: "Qisman texnik ko‘rik",
      voltmeter_check: "Voltmetr tekshiruvi",
      manometer_check: "Manometr tekshiruvi",
      hydraulic_test: "Gidravlik sinov",
      pressure_test: "Bosim sinovi",
      flush_test: "Yuvish va sinov",
      inner_outer_check: "Ichki/tashqi tekshiruv",
      lab_test: "Laboratoriya tekshiruvi",
      leveling_check: "Nivelirovka tekshiruvi",
      safety_valve_check: "Xavfsizlik klapani tekshiruvi",
      lubrication_check: "Yog‘lash tekshiruvi",
      alignment_check: "Markalash tekshiruvi",
      calibration_check: "Kalibrlash tekshiruvi",
    };
    return types[type] || type;
  };


  const formattedRows = (item) => ({
    "ID raqami": item.id,
    "Uskuna": item.equipment || "-",
    "Texnik xizmat turi": maintenanceTypeUz(item.maintenance_type),
    "Ta’rif": item.description || "-",
    "Ko‘rik sanasi": formatUzbekDate(item.scheduled_date),
    "Keyingi ko‘rik sanasi": formatUzbekDate(item.next_maintenance_date),
    "Bajarilganmi": (
      <SoftBadge
        variant="gradient"
        badgeContent={item.is_completed ? "Ha" : "Yo'q"}
        color={item.is_completed ? "success" : "error"}
        size="xs"
        container
      />
    ),
    "Bajarilgan sana": item.completed_date ? formatUzbekDate(item.completed_date) : "-",
    "Mas’ul foydalanuvchi": item.assigned_to || "-",
    "Qo‘shilgan vaqti": formatUzbekDateTime(item.created_at),
    "Yangilangan vaqti": formatUzbekDateTime(item.updated_at),
  });


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <MaintenanceHeader
              title="Ta'mirlash jadvali"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onAddClick={handleModalOpen}
            />
            <AddMaintenanceModal
              open={isModalOpen}
              onClose={handleModalClose}
              onSuccess={handleSuccess}

            />
            <SoftBox px={3} pb={3}>
              <JournalTable
                title="Ta'mirlash jadvali"
                apiEndpoint="https://api.ppr.vchdqarshi.uz/api/maintenance-list-create/"
                columns={maintenanceScheduleColumns}
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

export default MaintenanceScheduleTables;



