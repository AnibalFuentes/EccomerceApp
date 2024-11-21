"use client";

// import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
// import { Billboard } from "@prisma/client";
// import { Plus } from "lucide-react";
// import { useParams, useRouter } from "next/navigation";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "./data-table";
// import ApiList from "@/components/ui/api-list";

interface OrderClientsProps {
  data: OrderColumn[];
}
const OrderClient: React.FC<OrderClientsProps> = ({ data }) => {
  // const router = useRouter();
  // const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Manage orders for you store"
        />
        {/* <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button> */}
      </div>
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
      {/* <Heading title="API" description="Api calls for Billboards " /> */}
      {/* <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" /> */}
    </>
  );
};

export default OrderClient;
