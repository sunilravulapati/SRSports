import { client } from "./sanity/client";
import ProductInterface from "./components/ProductInterface";
import { Suspense } from "react"; // 1. Add this import

// Fetch data
async function getProducts() {
  // We check if quantity > 0 OR if there are any sizes with stock > 0
  const query = `*[_type == "product" && (quantity > 0 || count(sizes[stock > 0]) > 0)] | order(_createdAt desc) {
    _id,
    name,
    price,
    image,
    slug,
    category,
    quantity,
    sizes 
  }`;
  return await client.fetch(query);
}

// The Main Page
export default async function Home() {
  const products = await getProducts();
  
  return (
    // 2. Wrap the interface in Suspense to fix the build error
    <Suspense fallback={<div className="p-10 text-center">Loading Store...</div>}>
      <ProductInterface products={products} />
    </Suspense>
  );
}