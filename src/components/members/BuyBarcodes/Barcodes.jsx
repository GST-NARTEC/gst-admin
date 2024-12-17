import React, { useState } from "react";
import {
  Card,
  Button,
  Image,
  Skeleton,
  Input,
  Pagination,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrencySymbol } from "../../../store/slice/currencySlice";
import { useDebounce } from "../../../hooks/useDebounce";
import MainLayout from "../../../layout/AdminLayouts/MainLayout";
import { FaArrowLeft } from "react-icons/fa";
// api
import { useGetActiveProductsQuery } from "../../../store/apis/endpoints/products";
import { useGetTaxQuery } from "../../../store/apis/endpoints/tax";

// Redux
import { addToCart, setVatDetails, setCartTotals } from "../../../store/slice/cartSlice";

import Cart from "./Cart";

function Barcodes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currencySymbol = useSelector(selectCurrencySymbol);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 9; // Items per page

  const debouncedSearch = useDebounce(search, 500);

  const { data: productsData, isLoading: isProductsLoading } =
    useGetActiveProductsQuery({
      page,
      limit,
      search: debouncedSearch,
    });

  const { data: taxData, isLoading: isTaxLoading } = useGetTaxQuery();

  const defaultImage =
    "https://www.sagedata.com/images/2007/Code_128_Barcode_Graphic.jpg";

  const addItemToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(setCartTotals());
  };

  // Update VAT details when tax data changes
  React.useEffect(() => {
    if (taxData?.data?.vats?.[0]) {
      dispatch(setVatDetails(taxData.data.vats[0]));
      dispatch(setCartTotals());
    }
  }, [taxData, dispatch]);

  const vatDetails = taxData?.data?.vats?.[0] || {
    value: 0,
    type: "PERCENTAGE",
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation and search */}
        <div className="mb-4 flex justify-between items-center">
          <div className="w-72">
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearch}
              startContent={<MdSearch className="text-gray-400" />}
              className="w-full"
              isClearable
              onClear={() => setSearch("")}
            />
          </div>
          {/* back button */}
          <Button
            className="bg-navy-600 hover:bg-navy-700 text-white"
            startContent={<FaArrowLeft />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Products Grid */}
          <div className="flex-1">
            {isProductsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="p-4 shadow-md">
                    <div className="flex flex-col items-center text-center">
                      <Skeleton className="w-32 h-24 rounded-lg mb-3" />
                      <Skeleton className="w-3/4 h-4 rounded-lg mb-1" />
                      <Skeleton className="w-full h-8 rounded-lg mb-2" />
                      <Skeleton className="w-20 h-4 rounded-lg mb-3" />
                      <Skeleton className="w-full h-8 rounded-lg" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {productsData?.data?.products.map((product) => (
                    <Card
                      key={product.id}
                      className="p-4 shadow-md hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col items-center text-center">
                        <Popover showArrow placement="bottom">
                          <PopoverTrigger>
                            <Image
                              src={product.image || defaultImage}
                              alt={product.title}
                              className="w-32 h-24 object-contain mb-3 cursor-pointer hover:opacity-80"
                            />
                          </PopoverTrigger>
                          <PopoverContent className="p-2">
                            <Image
                              src={product.image || defaultImage}
                              alt={product.title}
                              className="w-80 h-60 object-contain"
                            />
                          </PopoverContent>
                        </Popover>
                        <h3 className="text-sm mb-1">{product.title}</h3>
                        <p className="text-gray-500 text-xs mb-2 h-8 line-clamp-2">
                          {product.description}
                        </p>
                        <p className="text-sm font-bold text-navy-600 mb-3">
                          {currencySymbol} {product.price.toFixed(2)}
                        </p>
                        <Button
                          className="w-full bg-navy-600 hover:bg-navy-700 text-white"
                          size="sm"
                          onClick={() => addItemToCart(product)}
                          isLoading={isProductsLoading}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Updated pagination using API response structure */}
                {productsData?.data?.pagination && (
                  <div className="mt-6 flex justify-center">
                    <Pagination
                      total={productsData?.data?.pagination?.totalPages}
                      page={page}
                      onChange={setPage}
                      showControls
                      classNames={{
                        wrapper: "gap-2",
                        item: "w-8 h-8",
                        cursor: "bg-navy-600 text-white font-medium",
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Cart section */}
          <div className="w-full lg:w-[350px] lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
            <Cart
              currencySymbol={currencySymbol}
              vatDetails={vatDetails}
              defaultImage={defaultImage}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Barcodes;
