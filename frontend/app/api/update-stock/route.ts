import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

const client = createClient({
  projectId: "xzyc3ssf",
  dataset: "cricket",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
});

export async function POST(req: Request) {
  try {
    const { productId, sizeKey, quantitySold } = await req.json();

    if (!productId || quantitySold === undefined) {
      return NextResponse.json(
        { error: "Missing productId or quantitySold" },
        { status: 400 }
      );
    }

    // Fetch current product data
    const product = await client.fetch(`*[_id == $id][0]`, { id: productId });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // 1. If it's a Clothing item (has sizes)
    if (sizeKey && product.sizes) {
      const sizes = product.sizes || [];
      
      const updatedSizes = sizes.map((s: any) => {
        if (s._key === sizeKey) {
          // Negative quantitySold = adding stock (restock)
          // Positive quantitySold = reducing stock (sale/gift)
          return { ...s, stock: Math.max(0, s.stock - quantitySold) };
        }
        return s;
      });

      await client.patch(productId).set({ sizes: updatedSizes }).commit();
    } 
    // 2. If it's a Regular item (Bat/Gloves/Balls)
    else {
      const newQuantity = Math.max(0, product.quantity - quantitySold);
      await client.patch(productId).set({ quantity: newQuantity }).commit();
    }

    return NextResponse.json({
      success: true,
      message: quantitySold < 0 ? "Stock added successfully" : "Stock updated successfully",
    });
  } catch (error) {
    console.error("Stock update failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}