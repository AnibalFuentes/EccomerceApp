// app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/page.tsx

import prismadb from "@/lib/prismadb";
import BillboardsForm from "./components/billboards-form";

interface BillboardPageProps {
  params: {
    billboardId: string;
  };
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
  const { billboardId } = params; // Desestructuración para facilitar el uso del parámetro

  // Consulta asincrónica para obtener los datos del billboard
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId, // Usamos el valor de billboardId aquí
    },
  });

  // Verifica si el billboard existe
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
