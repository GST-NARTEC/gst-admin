import React from "react";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { FaFileExcel, FaFilePdf, FaFileExport } from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";

const ExportMembers = ({ members }) => {
  const handleExportExcel = () => {
    try {
      // Prepare data for export
      const exportData = members.map((member) => {
        // Count order statuses
        const pendingPayment = member.orders?.filter((order) => order.status === "Pending Payment").length || 0;
        const pendingActivation = member.orders?.filter((order) => order.status === "Pending Account Activation").length || 0;
        const activated = member.orders?.filter((order) => order.status === "Activated").length || 0;

        return {
          "Company Name (EN)": member.companyNameEn,
          "Company Name (AR)": member.companyNameAr,
          "Email": member.email,
          "Mobile": member.mobile,
          "License No": member.companyLicenseNo,
          "Country": member.country,
          "Activated Orders": activated,
          "Pending Payment": pendingPayment,
          "Pending Activation": pendingActivation,
          "Status": member.isActive ? "Active" : "Inactive",
          "Created At": new Date(member.createdAt).toLocaleDateString(),
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
      toast.success("Exported to Excel successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export to Excel");
    }
  };

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF("landscape");
      
      // Add title
      doc.setFontSize(16);
      doc.text("Members Report", 14, 15);
      
      // Add generation date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);
      
      // Prepare table data
      const tableData = members.map((member) => {
        const pendingPayment = member.orders?.filter((order) => order.status === "Pending Payment").length || 0;
        const pendingActivation = member.orders?.filter((order) => order.status === "Pending Account Activation").length || 0;
        const activated = member.orders?.filter((order) => order.status === "Activated").length || 0;

        return [
          member.companyNameEn,
          member.companyNameAr,
          member.email,
          member.mobile,
          member.companyLicenseNo,
          member.country,
          `A:${activated} P:${pendingPayment} PA:${pendingActivation}`,
          member.isActive ? "Active" : "Inactive",
        ];
      });

      // Add table
      doc.autoTable({
        head: [
          [
            "Company (EN)",
            "Company (AR)",
            "Email",
            "Mobile",
            "License No",
            "Country",
            "Orders",
            "Status",
          ],
        ],
        body: tableData,
        startY: 28,
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: "bold",
        },
        columnStyles: {
          0: { cellWidth: 35 }, // Company (EN)
          1: { cellWidth: 35 }, // Company (AR)
          2: { cellWidth: 45 }, // Email
          3: { cellWidth: 25 }, // Mobile
          4: { cellWidth: 25 }, // License No
          5: { cellWidth: 25 }, // Country
          6: { cellWidth: 30 }, // Orders
          7: { cellWidth: 20 }, // Status
        },
        margin: { top: 28 },
      });

      // Generate file name with timestamp
      const fileName = `Members_Export_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Save PDF
      doc.save(fileName);
      toast.success("Exported to PDF successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export to PDF");
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="bg-navy-700 text-white"
          startContent={<FaFileExport />}
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
