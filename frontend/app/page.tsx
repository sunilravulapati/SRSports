import { client } from "./sanity/client";
import ProductInterface from "./components/ProductInterface";

// 1. Fetch data
async function getProducts() {
  // UPDATED QUERY:
  // We check if quantity > 0 OR if there are any sizes with stock > 0
  const query = `*[_type == "product" && (quantity > 0 || count(sizes[stock > 0]) > 0)] | order(_createdAt desc) {
    _id,
    name,
    price,
    image,
    slug,
    category,
    quantity,
    sizes // We need to fetch sizes to show stock properly
  }`;
  return await client.fetch(query);
}

// 2. The Main Page
export default async function Home() {
  const products = await getProducts();
  return <ProductInterface products={products} />;
}