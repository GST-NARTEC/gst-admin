import React, { useState } from "react";
import MainLayout from "../../layout/AdminLayouts/MainLayout";
import {
  Input,
  Select,
  SelectItem,
  Textarea,
  Button,
  Card,
  CardBody,
  Image,
  CardFooter,
  Switch,
} from "@nextui-org/react";
import { FaArrowLeft, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../store/apis/endpoints/products";
import { useGetCategoriesQuery } from "../../store/apis/endpoints/categories";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectCurrencySymbol } from "../../store/slice/currencySlice";

function AddProduct() {
  const currencySymbol = useSelector(selectCurrencySymbol);
  const { data: categoriesData } = useGetCategoriesQuery({
    page: 1,
    limit: 100,
  });
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    description: "",
    price: "",
    image: null,
    status: "active",
  });

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const productData = new FormData();
      productData.append("title", formData.title);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("categoryId", formData.categoryId);
      productData.append("status", formData.status);
      if (formData.image) {
        productData.append("image", formData.image);
      }

      await createProduct(productData).unwrap();
      toast.success("Product created successfully");
      navigate(-1);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create product");
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-end pb-4">
        <Button
          color="default"
          startContent={<FaArrowLeft />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>

      <Card className="container mx-auto">
        <CardBody className="p-6">
          <h1 className="text-2xl font-bold mb-4">Product Information</h1>
          <p className="text-gray-600 mb-6">
            Enter information for new product
          </p>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
              <Input
                label="Name"
                placeholder="Enter product name"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
              />

              <div className="flex gap-4">
                <Select
                  label="Category"
                  placeholder="Select a category"
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      categoryId: e.target.value,
                    }))
                  }
                  className="flex-1"
                >
                  {categoriesData?.data?.categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem> 
                  ))}
                </Select>

                <Input
                  type="number"
                  label="Price"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">
                        {currencySymbol}
                      </span>
                    </div>
                  }
                  className="flex-1"
                />
              </div>

              <Textarea
                label="Description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />

              <div className="flex items-center gap-2">
                <Switch
                  defaultSelected
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: value ? "active" : "inactive",
                    }))
                  }
                >
                  {formData.status === "active" ? "Active" : "Inactive"}
                </Switch>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">Image</h2>
                <Card
                  isPressable
                  onPress={() =>
                    document.getElementById("image-upload").click()
                  }
                  className="w-full aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer overflow-hidden"
                >
                  {formData.image ? (
                    <Image
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUpload className="text-4xl text-gray-400" />
                  )}
                </Card>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
              </div>
            </div>
          </div>
        </CardBody>

        <CardFooter className="flex justify-end">
          <div className="flex gap-5">
            <Button className="w-full" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button
              className="w-full bg-navy-700 text-white px-6"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Save Product
            </Button>
          </div>
        </CardFooter>
      </Card>
    </MainLayout>
  );
}

export default AddProduct;
