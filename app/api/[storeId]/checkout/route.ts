import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

// Cabeceras para CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Permitir solicitudes desde el frontend (puerto 3001)
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  // Responder a las solicitudes OPTIONS con las cabeceras de CORS
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const storeId = params.storeId; // Store ID desde los parámetros de la URL
  console.log("Store ID:", storeId);

  const { productIds, phone, address } = await req.json();

  // Validación de los IDs de los productos
  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product IDs are required", { status: 400 });
  }

  // Buscar la tienda con storeId
  const store = await prismadb.store.findUnique({
    where: { id: storeId },
  });

  if (!store) {
    return new NextResponse("Store not found", { status: 404 });
  }

  // Validar que los productos existen
  const products = await prismadb.product.findMany({
    where: { id: { in: productIds }, storeId: storeId },
  });

  // Comprobar si todos los productos existen en la tienda
  if (products.length !== productIds.length) {
    return new NextResponse(
      "Some products are not valid or do not exist in this store",
      { status: 400 }
    );
  }

  // Crear la orden
  let order;
  try {
    order = await prismadb.order.create({
      data: {
        storeId: storeId,
        isPaid: false,
        phone: phone || "",
        address: address || "",
      },
    });
    console.log("Order created:", order);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new NextResponse("Error creating order", { status: 500 });
  }

  // Crear los items de la orden
  const orderItems = productIds
    .filter((productId: string) => productId != null && productId !== "")
    .map((productId: string) => ({
      orderId: order.id,
      storeId: storeId,
      productId: productId,
    }));

  console.log("Order items:", orderItems);

  // Verificar si los items son válidos antes de insertarlos
  if (orderItems.length > 0) {
    try {
      await prismadb.orderItem.createMany({
        data: orderItems,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return new NextResponse("Error creating order items", { status: 500 });
    }
  } else {
    return new NextResponse("No valid order items", { status: 400 });
  }

  return NextResponse.json({ orderId: order.id });
}
