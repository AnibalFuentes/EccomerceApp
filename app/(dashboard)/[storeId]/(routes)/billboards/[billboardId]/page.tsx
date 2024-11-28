// app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/page.tsx

import prismadb from "@/lib/prismadb";
import BillboardsForm from "./components/billboards-form";

// Asegúrate de que el tipo sea correcto para `params`
interface BillboardPageProps {
  params: {
    billboardId: string;
  };
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
  // Desestructuramos billboardId para un acceso más directo
  const { billboardId } = params;

  // Consulta asincrónica para obtener los datos del cartel
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId, // Usamos el id del parámetro
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
