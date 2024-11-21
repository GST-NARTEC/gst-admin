import React from "react";
import MainLayout from "../../layout/AdminLayouts/MainLayout";
import { Button, Card } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import MemberPersonalInfo from "../../components/members/MemberPersonalInfo";
import OrdersTable from "../../components/members/OrdersTable";

function ViewMember() {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <div className="flex justify-end">
        <Button
          onClick={() => navigate(-1)}
          variant="solid"
          color="default"
          startContent={<MdArrowBackIosNew />}
        >
          Back
        </Button>
      </div>
      <Card className="m-4">
        <MemberPersonalInfo />
      </Card>
      <Card className="m-4">
        <OrdersTable />
      </Card>
    </MainLayout>
  );
}

export default ViewMember;
