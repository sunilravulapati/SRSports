// backend/schemaTypes/product.js

export default {
  name: 'product',
  title: 'Cricket Goods',
  type: 'document',
  fields: [
    { name: 'name', title: 'Product Name', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'price', title: 'Price (INR)', type: 'number' },
    { 
      name: 'category', 
      title: 'Category', 
      type: 'string', 
      options: {
        list: [
          { title: 'Cricket Bats', value: 'bat' },
          { title: 'Clothing (Shirts/Jerseys)', value: 'clothing' }, // <--- NEW
          { title: 'Gloves', value: 'gloves' },
          { title: 'Pads', value: 'pads' },
          { title: 'Kit Bags', value: 'bags' },
          { title: 'Helmets', value: 'helmets' },
          { title: 'Accessories', value: 'accessories' },
        ],
      },
    },
    // --- SIMPLE STOCK (For Bats, Balls, etc.) ---
    {
      name: 'quantity',
      title: 'Stock Quantity (For items without sizes)',
      type: 'number',
    },
    // --- SIZED STOCK (For Shirts/Clothing) ---
    {
      name: 'sizes',
      title: 'Sizes & Stock (For Clothing Only)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'size', title: 'Size (S, M, L, XL)', type: 'string' },
            { name: 'stock', title: 'Stock Quantity', type: 'number' }
          ]
        }
      ]
    },
    // --- MEDIA ---
    { name: 'image', title: 'Main Image', type: 'image', options: { hotspot: true } },
    { name: 'gallery', title: 'Gallery Images', type: 'array', of: [{ type: 'image' }] },
    { name: 'video', title: 'Product Video', type: 'file', options: { accept: 'video/*' } },
    { name: 'description', title: 'Description', type: 'text' },
  ],
  // --- ADMIN ALERT: Visual Stock Status in Studio ---
  preview: {
    select: {
      title: 'name',
      price: 'price',
      quantity: 'quantity',
      media: 'image'
    },
    prepare(selection) {
      const { title, price, quantity, media } = selection;
      const stockStatus = quantity === 0 ? '🔴 OUT OF STOCK' : quantity < 5 ? `🟠 Low Stock (${quantity})` : `🟢 In Stock (${quantity})`;
      return {
        title: title,
        subtitle: `${stockStatus} | ₹${price}`,
        media: media
      }
    }
  }
}