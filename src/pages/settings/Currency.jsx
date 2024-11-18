import React, { useState, useEffect } from "react";
import { Input, Button, Card, Spinner } from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  useGetCurrencyQuery,
  useCreateCurrencyMutation,
} from "../../store/apis/endpoints/currency";
import toast from "react-hot-toast";

function Currency() {
  const [currencySymbol, setCurrencySymbol] = useState("AED");
  const navigate = useNavigate();

  const { data: currencyData, isLoading: isCurrencyLoading } =
    useGetCurrencyQuery();
  const [createCurrency, { isLoading: isCreatingCurrency }] =
    useCreateCurrencyMutation();

  // Set currency symbol from API if available
  useEffect(() => {
    if (currencyData?.data?.currencies?.[0]?.symbol) {
      setCurrencySymbol(currencyData.data.currencies[0].symbol);
    }
  }, [currencyData]);

  const handleSave = async () => {
    try {
      await createCurrency({
        name: "currency",
        symbol: currencySymbol,
      }).unwrap();
      toast.success("Currency updated successfully");
    //   navigate("/settings");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update currency");
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Currency</h1>
        <Button
          color="default"
          startContent={<IoArrowBack />}
          onPress={() => navigate("/settings")}
        >
          Back
        </Button>
      </div>

      <Card className="p-6">
        {isCurrencyLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <Input
          label="Currency symbol"
          placeholder="Enter currency symbol"
          value={currencySymbol}
          onChange={(e) => setCurrencySymbol(e.target.value)}
          className="mb-4"
        />

        <div className="text-gray-600 space-y-2 mb-6">
          <p>
            This will be rendered on right side of amount to enhance overview.
            like {currencySymbol} 100.00
          </p>
          <p>
            This will be reflected on all the places where amount is displayed.
          </p>
        </div>

        <div className="flex justify-end">
          <Button
              className="bg-navy-700 text-white"
              onPress={handleSave}
              isLoading={isCreatingCurrency}
            >
              Save
            </Button>
          </div>
        </>
        )}
      </Card>
    </div>
  );
}

export default Currency;
