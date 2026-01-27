import React, { useState } from "react";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { FaFileExcel, FaFilePdf, FaFileExport } from "react-icons/fa";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import { useGetUserQuery } from "../../store/apis/endpoints/user";
import { Images } from "../../assets/Index";

const ExportMembers = ({ members }) => {
  const [isExporting, setIsExporting] = useState(false);

  const { data: allMembersData, isLoading: isLoadingAllMembers } = useGetUserQuery({
    page: 1,
    limit: 100,
  });

  const loadImageAsBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const handleExportExcel = async () => {
    try {
      setIsExporting(true);
      toast.loading("Preparing Excel export...");

      const membersToExport = allMembersData?.data?.users || members;

      if (!membersToExport || membersToExport.length === 0) {
        toast.dismiss();
        toast.error("No data to export");
        setIsExporting(false);
        return;
      }

      // Prepare data for export
      const exportData = membersToExport.map((member) => {
        // Count order statuses
        const pendingPayment = member.orders?.filter((order) => order.status === "Pending Payment").length || 0;
        const pendingActivation = member.orders?.filter((order) => order.status === "Pending Account Activation").length || 0;
        const activated = member.orders?.filter((order) => order.status === "Activated").length || 0;

        return {
          "Company Name (EN)": member.companyNameEn || "",
          "Company Name (AR)": member.companyNameAr || "",
          "Email": member.email || "",
          "Mobile": member.mobile || "",
          "License No": member.companyLicenseNo || "",
          "Country": member.country || "",
          "Activated Orders": activated,
          "Pending Payment": pendingPayment,
          "Pending Activation": pendingActivation,
          "Status": member.isActive ? "Active" : "Inactive",
          "Created At": member.createdAt ? new Date(member.createdAt).toLocaleDateString() : "",
        };
      });

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(exportData);
      
      // Set column widths
      ws['!cols'] = [
        { wch: 25 }, // Company Name (EN)
        { wch: 25 }, // Company Name (AR)
        { wch: 30 }, // Email
        { wch: 15 }, // Mobile
        { wch: 15 }, // License No
        { wch: 15 }, // Country
        { wch: 15 }, // Activated Orders
        { wch: 15 }, // Pending Payment
        { wch: 18 }, // Pending Activation
        { wch: 10 }, // Status
        { wch: 15 }, // Created At
      ];

      // Create workbook and append worksheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Members");

      // Generate file name with timestamp
      const fileName = `Members_Export_${new Date().toISOString().split('T')[0]}.xlsx`;
      
      // Write file
      XLSX.writeFile(wb, fileName);
      
      toast.dismiss();
      toast.success(`Exported ${exportData.length} members to Excel successfully`);
      setIsExporting(false);
    } catch (error) {
      console.error("Export error:", error);
      toast.dismiss();
      toast.error("Failed to export to Excel");
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      toast.loading("Preparing PDF export...");

      const membersToExport = allMembersData?.data?.users || members;

      if (!membersToExport || membersToExport.length === 0) {
        toast.dismiss();
        toast.error("No data to export");
        setIsExporting(false);
        return;
      }

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });

      // Try to load logo
      let logoData = null;
      try {
        logoData = await loadImageAsBase64(Images.Logo);
      } catch (error) {
        console.warn("Could not load logo:", error);
      }

      // Add logo on the left
      if (logoData) {
        doc.addImage(logoData, 'PNG', 14, 8, 35, 14); // x, y, width, height
      }

      // Add title and info on the RIGHT side
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.setFontSize(18);
      doc.setFont(undefined, 'bold');
      doc.text("Members Report", pageWidth - 14, 12, { align: 'right' });
      
      // Add generation info on the right
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth - 14, 18, { align: 'right' });
      doc.text(`Total Members: ${membersToExport.length}`, pageWidth - 14, 23, { align: 'right' });

      // Add a line separator
      doc.setDrawColor(200, 200, 200);
      doc.line(14, 26, pageWidth - 14, 26);
      
      // Prepare table data (WITHOUT Company AR column)
      const tableData = membersToExport.map((member) => {
        const pendingPayment = member.orders?.filter((order) => order.status === "Pending Payment").length || 0;
        const pendingActivation = member.orders?.filter((order) => order.status === "Pending Account Activation").length || 0;
        const activated = member.orders?.filter((order) => order.status === "Activated").length || 0;

        return [
          member.companyNameEn || "",
          member.email || "",
          member.mobile || "",
          member.companyLicenseNo || "",
          member.country || "",
          `${activated}/${pendingPayment}/${pendingActivation}`,
          member.isActive ? "Active" : "Inactive",
        ];
      });

      // Add table using autoTable (WITHOUT Company AR column)
      autoTable(doc, {
        head: [
          [
            "Company (EN)",
            "Email",
            "Mobile",
            "License No",
            "Country",
            "Orders (A/PP/PA)",
            "Status",
          ],
        ],
        body: tableData,
        startY: 30,
        styles: {
          fontSize: 9,
          cellPadding: 3,
          font: "helvetica",
          lineColor: [220, 220, 220],
          lineWidth: 0.1,
        },
        headStyles: {
          fillColor: [33, 58, 111], // Navy blue color
          textColor: 255,
          fontStyle: "bold",
          fontSize: 10,
          halign: 'center',
        },
        alternateRowStyles: {
          fillColor: [245, 247, 250],
        },
        columnStyles: {
          0: { cellWidth: 50, halign: 'left' }, // Company (EN)
          1: { cellWidth: 60, halign: 'left' }, // Email
          2: { cellWidth: 30, halign: 'left' }, // Mobile
          3: { cellWidth: 28, halign: 'left' }, // License No
          4: { cellWidth: 28, halign: 'left' }, // Country
          5: { cellWidth: 32, halign: 'center' }, // Orders
          6: { cellWidth: 22, halign: 'center' }, // Status
        },
        margin: { top: 30, left: 14, right: 14 },
        theme: 'striped',
      });

      // Add page numbers only (centered at bottom)
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128);
        
        // Page number centered
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 8,
          { align: 'center' }
        );
      }

      // Generate file name with timestamp
      const fileName = `Members_Report_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Save PDF
      doc.save(fileName);
      
      toast.dismiss();
      toast.success(`Exported ${membersToExport.length} members to PDF successfully`);
      setIsExporting(false);
    } catch (error) {
      console.error("Export error:", error);
      toast.dismiss();
      toast.error("Failed to export to PDF");
      setIsExporting(false);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="bg-navy-700 text-white"
          startContent={<FaFileExport />}
          isLoading={isExporting}
          isDisabled={isExporting || isLoadingAllMembers}
        >
          Export
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Export Options">
        <DropdownItem
          key="excel"
          startContent={<FaFileExcel className="text-green-600" />}
          onClick={handleExportExcel}
        >
          Export to Excel
        </DropdownItem>
        <DropdownItem
          key="pdf"
          startContent={<FaFilePdf className="text-red-500" />}
          onClick={handleExportPDF}
        >
          Export to PDF
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ExportMembers;