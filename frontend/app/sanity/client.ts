import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "xzyc3ssf", // Find this in your sanity.config.js or sanity.json
  dataset: "cricket", 
  apiVersion: "2024-01-01",
  useCdn: false, // Set to false for real-time updates while developing
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}