import React, { useState, useEffect } from "react";
import { Input, Button, Card, Spinner } from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  useGetCurrencyQuery,
  useUpdateCurrencyMutation,
} from "../../store/apis/endpoints/currency";
import toast from "react-hot-toast";

function Currency() {
  const [currencySymbol, setCurrencySymbol] = useState("SAR");
  const navigate = useNavigate();

  const { data: currency, isLoading: isCurrencyLoading } =
    useGetCurrencyQuery();
  const [updateCurrency, { isLoading: isUpdatingCurrency }] =
    useUpdateCurrencyMutation();

  useEffect(() => {
    if (currency?.symbol) {
      setCurrencySymbol(currency.symbol);
    }
  }, [currency]);

  const handleSave = async () => {
    try {
      if (!currency?.id) throw new Error("Currency ID not found");

      const payload = {
        id: currency.id,
        data: {
          symbol: currencySymbol,
          name: "currency",
        },
      };

      await updateCurrency(payload).unwrap();
      toast.success("Currency updated successfully");
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
          onPress={() => navigate("/admin/settings")}
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
                This will be rendered on right side of amount to enhance
                overview. like {currencySymbol} 100.00
              </p>
              <p>
                This will be reflected on all the places where amount is
                displayed.
              </p>
            </div>

            <div className="flex justify-end">
              <Button
                className="bg-navy-700 text-white"
                onPress={handleSave}
                isLoading={isUpdatingCurrency}
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
