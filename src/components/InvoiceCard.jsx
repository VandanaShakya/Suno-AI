import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, Calendar, DollarSign } from "lucide-react";

const InvoiceCard = ({ invoice, onView, onDownload }) => {
  const formatAmount = (amount, currency = "usd") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const getStatusColor = (status) => {
    const colors = {
      paid: "bg-green-500/20 text-green-400 border-green-500/50",
      open: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
      draft: "bg-gray-500/20 text-gray-400 border-gray-500/50",
      void: "bg-red-500/20 text-red-400 border-red-500/50",
      uncollectible: "bg-red-500/20 text-red-400 border-red-500/50",
    };
    return colors[status] || colors.draft;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, "0")}, ${date.getFullYear()}`;
    } catch {
      return "N/A";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#507ADB] to-[#9B49E9] flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Invoice {invoice.invoiceNumber}</h3>
            <p className="text-gray-400 text-sm">{invoice.planType === "pro" ? "Pro Plan" : "Pro+ Plan"}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(invoice.status)}`}
        >
          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-gray-300">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{formatDate(invoice.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <DollarSign className="w-4 h-4" />
          <span className="text-sm font-semibold">{formatAmount(invoice.amount, invoice.currency)}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onView(invoice)}
          className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
          style={{ background: "linear-gradient(to right, #507ADB, #9B49E9)" }}
        >
          View Details
        </button>
        {invoice.pdfUrl && (
          <button
            onClick={() => onDownload(invoice)}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default InvoiceCard;

