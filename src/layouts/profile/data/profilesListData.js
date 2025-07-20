import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig";

function useProfilesListData() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axiosInstance.get("https://api.ppr.vchdqarshi.uz/api/users/")
      .then((res) => {
        const users = res.data;
        const mappedUsers = users.map((user) => ({
          image: user.image || "-",
          name: user.name || user.username,
          description: user.role || "Rol mavjud emas",
          action: {
            type: "internal",
            route: "/pages/profile/profile-overview",
            color: "info",
          },
        }));
        setProfiles(mappedUsers);
      })
      .catch((err) => {
        console.error("Foydalanuvchilarni olishda xatolik:", err);
      });
  }, []);

  return profiles;
}

export default useProfilesListData;
