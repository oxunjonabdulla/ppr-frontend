const reportsBarChartData = {
  chart: {
    labels: ["Dushanba", "Seshanba", "Chorshanba", "Paysanba", "Juma", "Shanba", "Yakshanba"],
    datasets: { label: "Ta'mirlangan",  data: [12, 18, 9, 14, 20, 7, 5], },
  },
  items: [
    {
      icon: { color: "primary", component: "people" },
      label: "Xodimlar",
      progress: { content: "36K", percentage: 60 },
    },
    {
      icon: { color: "info", component: "settings" },
      label: "Nosozliklar",
      progress: { content: "2M", percentage: 90 },
    },
    {
      icon: { color: "warning", component: "engineering" },
      label: "Bajarilgan",
      progress: { content: "$435", percentage: 30 },
    },
    {
      icon: { color: "error", component: "build" },
      label: "Uskunalar",
      progress: { content: "43", percentage: 50 },
    },
  ],
};

export default reportsBarChartData;
