import { Outlet, useNavigation } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Spinner from "../../shared/components/Spinner.jsx";

export default function Layout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f4f1] text-black">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        {isNavigating && <Spinner />}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
