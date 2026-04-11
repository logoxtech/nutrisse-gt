import ProtectedRoute from "@/components/shared/ProtectedRoute";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
