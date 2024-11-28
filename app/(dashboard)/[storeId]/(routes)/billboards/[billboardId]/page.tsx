// app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/page.tsx

import prismadb from "@/lib/prismadb";
import BillboardsForm from "./components/billboards-form";

// Componente server-side asincrónico
const BillboardPage = async ({ params }: { params: { billboardId: string } }) => {
  // Consulta asincrónica para obtener los datos del billboard
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId, // id del parámetro dinámico
    },
  });

  // Verifica si se encontró el billboard
  if (!billboard) {
    return <div>No se encontró el cartel.</div>;
  }

  // Renderizado del componente con datos cargados
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
