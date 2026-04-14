import { Timestamp } from "firebase/firestore";

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export function formatDate(dateField: unknown): string {
  if (!dateField) return "Fecha desconocida";
  if (dateField instanceof Timestamp) return dateField.toDate().toLocaleDateString("es-GT");
  if (typeof dateField === "object" && dateField !== null && "toDate" in dateField) {
    return (dateField as { toDate: () => Date }).toDate().toLocaleDateString("es-GT");
  }
  return new Date(dateField as string | number).toLocaleDateString("es-GT");
}

export function formatCurrency(amount: number): string {
  return `Q ${amount.toFixed(2)}`;
}

export function getStatusBadge(status: string) {
  return {
    label: ORDER_STATUS_LABELS[status] || status,
    color: ORDER_STATUS_COLORS[status] || "bg-stone-100 text-stone-800",
  };
}
