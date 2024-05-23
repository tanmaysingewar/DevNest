import {
  IconAdjustmentsFilled,
  IconAffiliateFilled,
  IconDeviceDesktop,
  IconTopologyFullHierarchy,
  IconTools,
  IconId,
} from "@tabler/icons-react";

export const data = [
  {
    icon: IconTopologyFullHierarchy,
    label: "Labs 😁",
    description: "Assigned Labs",
    path: "/admin/labs",
  },
  {
    icon: IconDeviceDesktop,
    label: "Courses 🔥",
    description: "Explore Courses",
    path: "/admin/courses",
  },
  {
    icon: IconAffiliateFilled,
    label: "Material 📚",
    description: "Articles & Blogs",
    path: "/admin/materials",
  },
  {
    icon: IconTools,
    label: "Tools ⚒️",
    description: "Learning Materials",
    path: "/admin/tools",
  },
  {
    icon: IconAdjustmentsFilled,
    label: "Settings",
    description: "Portal Settings",
    path: "/admin/settings",
  },
  {
    icon: IconId,
    label: "Students Details",
    description: "See all Students Details",
    path: "/admin/studentsDetails",
  },
  {
    icon: IconId,
    label: "Faculty Details",
    description: "See all Faculty Details",
    path: "/admin/facultyDetails",
  },
];

export default {
  data,
};
