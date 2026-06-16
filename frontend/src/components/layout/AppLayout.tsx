import { Outlet } from "react-router-dom";
import CompanyLogo from "../ui/CompanyLogo";

export default function AppLayout() {
  return (
    <>
      <CompanyLogo />
      <Outlet />
    </>
  );
}
