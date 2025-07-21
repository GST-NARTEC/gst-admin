import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";

function ProductsCards() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pageSize = 12;

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://gs1ksa.org/api/products/paginatedProducts?page=${currentPage}&pageSize=${pageSize}`,
          {
            method: "GET",
            headers: {
              apikey: "055c1edc391cf2fbe229e4a1bf0e3100",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data);

          // Set total products count
          setTotalProducts(data.totalProducts);

          // Transform the API data to match our component structure
          const transformedProducts = data.products.map((product) => ({
            id: product.id,
            name:
              isArabic && product.productnamearabic
                ? product.productnamearabic
                : product.productnameenglish,
            image: product.front_image
              ? `https://gs1ksa.org${product.front_image.replace(/\\/g, "/")}`
              : "https://via.placeholder.com/300x300?text=No+Image",
            barcode: product.barcode,
            brand: product.BrandName,
            origin: product.Origin,
            productType: product.ProductType,
          }));

          setProducts(transformedProducts);
        } else {
          console.error("API Error:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, isArabic]);

  const handleNextPage = (e) => {
    e.preventDefault();
    const totalPages = Math.ceil(totalProducts / pageSize);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(totalProducts / pageSize);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="py-16 px-4 bg-white" dir={isArabic ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-dubai">
              {t("products.recentlyAdded")}
            </h2>
            <p className="text-gray-600 mt-2">
              {t("products.totalProducts")}:{" "}
              <span className="font-semibold text-primary">
                {totalProducts.toLocaleString()}
              </span>
            </p>
          </div>
        </div>

        {/* Page Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">
            {t("products.showingPage")} {currentPage} {t("products.of")}{" "}
            {totalPages} ({products.length} {t("products.productsCount")})
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? // Loading skeleton
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse"
                >
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              ))
            : products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-gray-100"
                >
                  {/* Product Image Section */}
                  <div className="relative p-6 bg-gray-50 h-64 flex items-center justify-center">
                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x300?text=No+Image";
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-6 text-center">
                    <h3 className="text-gray-700 font-medium mb-2 text-sm leading-relaxed line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Brand and Origin */}
                    <div className="text-xs text-gray-500 mb-4">
                      <p>{product.brand}</p>
                      <p>{product.origin}</p>
                    </div>

                    {/* See Details Button */}
                    <button
                      onClick={() => handleProductClick(product)}
                      className="bg-primary hover:bg-navy-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform group-hover:scale-105 shadow-md text-sm"
                    >
                      {t("products.seeDetails")}
                    </button>
                  </div>
                </div>
              ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-12 space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary hover:bg-navy-600 text-white transform hover:scale-105 shadow-lg"
            }`}
          >
            {isArabic ? "→" : "←"} {t("products.previous")}
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600">{t("products.page")}</span>
            <span className="bg-primary text-white px-4 py-2 rounded-full font-semibold">
              {currentPage}
            </span>
            <span className="text-gray-600">
              {t("products.of")} {totalPages}
            </span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              currentPage >= totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary hover:bg-navy-600 text-white transform hover:scale-105 shadow-lg"
            }`}
          >
            {t("products.next")} {isArabic ? "←" : "→"}
          </button>
        </div>

        {/* Product Details Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          size="2xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {t("products.productDetails")}
                </ModalHeader>
                <ModalBody>
                  {selectedProduct && (
                    <div className="space-y-6">
                      {/* Product Image */}
                      <div className="flex justify-center">
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="max-w-xs max-h-64 object-contain rounded-lg border"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/300x300?text=No+Image";
                          }}
                        />
                      </div>

                      {/* Product Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-gray-700">
                              {t("products.productName")}
                            </h3>
                            <p className="text-gray-600">
                              {selectedProduct.name}
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-700">
                              {t("products.brand")}
                            </h3>
                            <p className="text-gray-600">
                              {selectedProduct.brand ||
                                t("products.notAvailable")}
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-700">
                              {t("products.origin")}
                            </h3>
                            <p className="text-gray-600">
                              {selectedProduct.origin ||
                                t("products.notAvailable")}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-gray-700">
                              {t("products.productType")}
                            </h3>
                            <p className="text-gray-600">
                              {selectedProduct.productType ||
                                t("products.notAvailable")}
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-700">
                              {t("products.barcode")}
                            </h3>
                            <p className="text-gray-600 font-mono">
                              {selectedProduct.barcode ||
                                t("products.notAvailable")}
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-700">
                              {t("products.productId")}
                            </h3>
                            <p className="text-gray-600 text-xs break-all">
                              {selectedProduct.id}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="light" onPress={onClose}>
                    {t("common.close")}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default ProductsCards;
