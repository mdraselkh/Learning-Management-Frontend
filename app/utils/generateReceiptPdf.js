import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "@/public/images/logo.png";

export const generateReceiptPDF = (payment) => {
  const doc = new jsPDF();

  const img = new Image();
  img.src = logo.src;

  img.onload = () => {
    doc.addImage(img, "PNG", 10, 10, 40, 20);

    doc.setFontSize(18);
    doc.text("Payment Receipt", 105, 35, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Invoice ID: ${payment.id}`, 14, 50);
    doc.text(`Student Name: ${payment.name}`, 14, 60);
    doc.text(`Email: ${payment.email}`, 14, 70);

    doc.text(
      `Date: ${new Date(payment.payment_date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}`,
      14,
      80
    );

    autoTable(doc, {
      startY: 90,
      head: [["Course", "Category", "Method", "Amount(tk)", "Status"]],
      body: [
        [
          payment.title,
          payment.category_title,
          payment.payment_method.toUpperCase(),
          `${(parseFloat(payment.amount) * 110).toFixed(2)}`,
          payment.status.charAt(0).toUpperCase() + payment.status.slice(1),
        ],
      ],
    });

    doc.text("Thank you for your payment!", 14, doc.lastAutoTable.finalY + 20);

    doc.save(`receipt-${payment.id}.pdf`);
  };
};
