// app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/page.tsx

import prismadb from "@/lib/prismadb";
import BillboardsForm from "./components/billboards-form";

// Asegúrate de que el tipo sea correcto para `params`

export const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  // Consulta asincrónica para obtener los datos del billboard
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsForm initialData={billboard} />
      </div>
    </div>
  );
};
