import { client } from "../sanity/client";
import StoreView from "../components/StoreView";

// Fetch data on the server
async function getProducts() {
  const query = `*[_type == "product" && (quantity > 0 || count(sizes[stock > 0]) > 0)] | order(_createdAt desc) {
    _id, name, price, image, slug, category, quantity, sizes 
  }`;
  return await client.fetch(query);
}

export default async function StorePage() {
  const products = await getProducts();
  return <StoreView products={products} />;
}