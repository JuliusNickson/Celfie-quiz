import { Link } from "react-router-dom";
import logo from "../../assets/CELLFIE-LOGO-COLOR.png";

export default function CompanyLogo() {
  return (
    <Link
      to="/"
      className="fixed top-4 right-4 z-50 sm:top-6 sm:right-6"
      aria-label="Celfie home"
    >
      <img
        src={logo}
        alt="Celfie"
        className="h-14 w-auto sm:h-16"
      />
    </Link>
  );
}
