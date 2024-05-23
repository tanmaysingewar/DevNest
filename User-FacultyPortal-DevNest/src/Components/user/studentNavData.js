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
      path : "/student/labs"
    },
    {
      icon: IconDeviceDesktop,
      label: "Courses 🔥",
      description: "Explore Courses",
      path : "/student/courses"
    },
    {
      icon: IconAffiliateFilled,
      label: "Material 📚",
      description: "Articles & Blogs",
      path : "/student/materials"
    },
    { 
      icon: IconTools, label: "Tools ⚒️", 
      description: "Learning Materials",
      path : "/student/tools"
  },
    {
      icon: IconAdjustmentsFilled,
      label: "Settings",
      description: "Portal Settings",
      path : "/student/settings"
    },
    {
      icon: IconUserCircle,
      label: "Profile",
      description: "View & Edit Profile",
      path : "/student/profile"
    },
  ];

  export default {
    data,
}