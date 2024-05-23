import {
  IconUserCircle,
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
    path: "/faculty/labs",
  },
  {
    icon: IconDeviceDesktop,
    label: "Courses 🔥",
    description: "Explore Courses",
    path: "/faculty/courses",
  },
  {
    icon: IconAffiliateFilled,
    label: "Material 📚",
    description: "Articles & Blogs",
    path: "/faculty/materials",
  },
  {
    icon: IconTools,
    label: "Tools ⚒️",
    description: "Learning Materials",
    path: "/faculty/tools",
  },
  {
    icon: IconAdjustmentsFilled,
    label: "Settings",
    description: "Portal Settings",
    path: "/faculty/settings",
  },
  {
    icon: IconId,
    label: "Students Details",
    description: "See all Details",
    path: "/faculty/studentsDetails",
  },
  {
    icon: IconUserCircle,
    label: "Profile",
    description: "View & Edit Profile",
    path: "/faculty/profile",
  },
];

export default {
  data,
};
