import ProductDetailClient from "./_components/ProductDetailClient";

export const dynamicParams = false;

export async function generateStaticParams() {
  // Generate at least one static path to ensure Next.js builds the segment
  return [{ slug: "index" }];
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
