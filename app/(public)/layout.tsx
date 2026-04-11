import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CartDrawer from "@/components/store/CartDrawer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
      <CartDrawer />
    </div>
  );
}
