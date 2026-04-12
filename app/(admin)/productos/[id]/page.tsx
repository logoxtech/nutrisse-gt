import ProductFormClient from "./_components/ProductFormClient";

export const dynamicParams = false;

export async function generateStaticParams() {
  // Generate at least one static path to ensure Next.js builds the segment
  return [{ id: "nuevo" }];
}

export default function ProductFormPage() {
  return <ProductFormClient />;
}
