import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Switch,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useUpdateAddonMutation } from "../../store/apis/endpoints/addons";
import { useSelector } from "react-redux";
import { selectCurrencySymbol } from "../../store/slice/currencySlice";

function EditAddons({ isOpen, onClose, selectedAddon }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [stock, setStock] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [updateAddon, { isLoading }] = useUpdateAddonMutation();
  const currencySymbol = useSelector(selectCurrencySymbol);

  useEffect(() => {
    if (selectedAddon) {
      setName(selectedAddon.name);
      setPrice(selectedAddon.price.toString());
      setUnit(selectedAddon.unit);
      setStock(selectedAddon.stock.toString());
      setIsActive(selectedAddon.status === "active");
    }
  }, [selectedAddon]);

  const handleClose = () => {
    setName("");
    setPrice("");
    setUnit("");
    setStock("");
    setIsActive(true);
    onClose();
  };

  const handleUpdate = async () => {
    if (!name || !price) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      id: selectedAddon?.id,
      name,
      price: Number(price),
      unit,
      stock: Number(stock),
      status: isActive ? "active" : "inactive",
    };

    const res = await updateAddon(payload);
    if (res.data) {
      toast.success("Addon updated successfully");
      handleClose();
    }
    if (res.error) {
      toast.error(res.error.data.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Addon
            </ModalHeader>
            <ModalBody>
              <Input
                label="Name"
                placeholder="Enter addon name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isRequired
              />

              <div className="flex gap-4">
                <Input
                  type="number"
                  label="Price"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">{currencySymbol}</span>
                    </div>
                  }
                  className="flex-1"
                  isRequired
                  step="0.01"
                  min="0"
                />

                <Input
                  label="Unit"
                  placeholder="e.g., portion, slice"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="flex-1"
                  isRequired
                />
              </div>

              <Input
                type="number"
                label="Stock"
                placeholder="Enter current stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                isRequired
                min="0"
              />

              <div className="flex items-center justify-between">
                <span className="font-semibold">Status</span>
                <Switch
                  isSelected={isActive}
                  onValueChange={setIsActive}
                >
                  {isActive ? "Active" : "Inactive"}
                </Switch>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={handleClose}
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                color="primary"
                onPress={handleUpdate}
              >
                Update Addon
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default EditAddons;
