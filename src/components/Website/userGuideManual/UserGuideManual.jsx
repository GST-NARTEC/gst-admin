import React, { useState } from "react";
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";
import { useGetUserGuidesQuery } from "../../../store/apis/endpoints/guideline";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardFooter,
  Button,
  Spinner,
  Input,
  Pagination,
} from "@nextui-org/react";
import {
  FaFilePdf,
  FaVideo,
  FaDownload,
  FaPlay,
  FaSearch,
  FaEye,
} from "react-icons/fa";
import { useDebounce } from "../../../hooks/useDebounce";
import SEO from "../../seo/SEO";

function UserGuideManual() {
  const [selectedTab, setSelectedTab] = useState("pdf");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit] = useState(10);

  const debouncedSearch = useDebounce(search, 500);

  const { data: guideData, isLoading } = useGetUserGuidesQuery({
    page,
    limit,
    search: debouncedSearch,
    type: selectedTab,
  });

  const handleTabChange = (key) => {
    setSelectedTab(key);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleView = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const renderGuideCards = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-[400px]">
          <Spinner size="lg" color="primary" />
        </div>
      );
    }

    if (!guideData?.data?.guides?.length) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <div className="text-5xl mb-4">
            {selectedTab === "pdf" ? <FaFilePdf /> : <FaVideo />}
          </div>
          <p className="text-xl">
            No {selectedTab === "pdf" ? "PDF" : "video"} guidelines available
          </p>
        </div>
      );
    }

    return (
      <>
        <SEO
          title="User Guide Manual"
          description="Access our comprehensive collection of guides and tutorials, for PDF and video guides. how to use our products and services."
          keywords={[
            "User Guide Manual",
            "User Guide",
            "User Guide Manual",
            "User Guide Manual",
            "PDF Guides",
            "Video Guides",
            "How to use our products and services",
            "GST Global Standard Technology Saudi Arabia",
            "GST Saudi Arabia",
            "GST Solutions",
          ]}
          image="/Logo.png"
          url="https://gstsa1.org/user-guide-manual"
          type="website"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
          {guideData.data.guides.map((guide) => (
            <Card
              key={guide.id}
              className="w-full group hover:shadow-lg transition-shadow duration-200"
              isPressable
            >
              <CardBody className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gray-100 group-hover:bg-primary/10 transition-colors duration-200">
                    {selectedTab === "pdf" ? (
                      <FaFilePdf className="text-red-500 text-2xl" />
                    ) : (
                      <FaVideo className="text-blue-500 text-2xl" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-200">
                      {guide.titleEn || guide.titleAr || "Untitled"}
                    </h3>
                    {(guide.descriptionEn || guide.descriptionAr) && (
                      <p className="text-gray-600 mt-2 line-clamp-2">
                        {guide.descriptionEn || guide.descriptionAr}
                      </p>
                    )}
                  </div>
                </div>
              </CardBody>
              <CardFooter className="justify-end gap-2 p-4 pt-0">
                {selectedTab === "pdf" ? (
                  <>
                    {/* <Button
                      className="bg-transparent text-primary border-primary"
                      variant="bordered"
                      startContent={<FaEye />}
                      onClick={() => handleView(guide.link)}
                      size="sm"
                    >
                      View PDF
                    </Button> */}
                    <Button
                      className="bg-primary text-white"
                      startContent={<FaDownload />}
                      onClick={() => handleView(guide.link)}
                      size="sm"
                    >
                      Download
                    </Button>
                  </>
                ) : (
                  <Button
                    className="bg-primary text-white"
                    startContent={<FaPlay />}
                    onClick={() => handleView(guide.link)}
                    size="sm"
                  >
                    Play Video
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 py-8 mt-4">
          <div className="flex gap-2 items-center">
            <span className="text-default-400">
              Page {page} of {guideData.data.pagination.totalPages}
            </span>
          </div>
          <Pagination
            isCompact
            showControls
            total={guideData.data.pagination.totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="lg"
            radius="full"
            classNames={{
              wrapper: "gap-0 overflow-visible h-8",
              item: "w-8 h-8 text-small rounded-none",
              cursor: "bg-primary text-white font-bold",
              next: "bg-transparent hover:bg-default-100",
              prev: "bg-transparent hover:bg-default-100",
            }}
          />
        </div>
      </>
    );
  };

  return (
    <WebsiteLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
            User Guide Manual
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Access our comprehensive collection of guides and tutorials
          </p>

          <div className="mb-8">
            <Input
              isClearable
              placeholder="Search guides..."
              value={search}
              onValueChange={setSearch}
              startContent={<FaSearch className="text-gray-400" />}
              size="lg"
              classNames={{
                input: "text-base",
                inputWrapper: "shadow-sm",
              }}
            />
          </div>

          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={handleTabChange}
            aria-label="User Guide Options"
            color="primary"
            variant="underlined"
            classNames={{
              tabList:
                "gap-6 w-full relative rounded-none p-0  border-b border-divider",
              cursor: "w-full bg-primary",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-primary",
            }}
          >
            <Tab
              key="pdf"
              title={
                <div className="flex items-center space-x-2">
                  <FaFilePdf />
                  <span>PDF Guidelines</span>
                </div>
              }
            >
              {renderGuideCards()}
            </Tab>
            <Tab
              key="video"
              title={
                <div className="flex items-center space-x-2">
                  <FaVideo />
                  <span>Video Guidelines</span>
                </div>
              }
            >
              {renderGuideCards()}
            </Tab>
          </Tabs>
        </div>
      </div>
    </WebsiteLayout>
  );
}

export default UserGuideManual;
