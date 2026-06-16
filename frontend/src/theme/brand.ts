export const brandColors = {
  magenta: "#ec008c",
  purple: "#472f92",
  purpleLight: "#6c59a6",
  red: "#ef4136",
  coral: "#f15b61",
  white: "#ffffff",
} as const;

export const profileBrandClasses = {
  Connector: {
    text: "text-brand-magenta",
    bg: "bg-brand-magenta",
    border: "border-brand-magenta/30",
  },
  Explorer: {
    text: "text-brand-purple",
    bg: "bg-brand-purple",
    border: "border-brand-purple/30",
  },
  Creator: {
    text: "text-brand-purple-light",
    bg: "bg-brand-purple-light",
    border: "border-brand-purple-light/30",
  },
  "Problem Solver": {
    text: "text-brand-red",
    bg: "bg-brand-red",
    border: "border-brand-red/30",
  },
} as const;
