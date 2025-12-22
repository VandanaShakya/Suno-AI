import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, Calendar, DollarSign, CheckCircle } from "lucide-react";

const InvoiceDetail = ({ invoice, isOpen, onClose, onDownload }) => {
  if (!invoice) return null;

  const formatAmount = (amount, currency = "usd") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, "0")}, ${date.getFullYear()}`;
    } catch {
      return "N/A";
    }
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#131B27] border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#131B27] border-b border-gray-700 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#507ADB] to-[#9B49E9] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-xl">Invoice {invoice.invoiceNumber}</h2>
                    <p className="text-gray-400 text-sm">{invoice.planType === "pro" ? "Pro Plan" : "Pro+ Plan"}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(invoice.status)}`}
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                  {invoice.pdfUrl && (
                    <button
                      onClick={() => onDownload(invoice)}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  )}
                </div>

                {/* Invoice Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Invoice Date</p>
                    <div className="flex items-center gap-2 text-white">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(invoice.createdAt)}</span>
                    </div>
                  </div>
                  {invoice.paidAt && (
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Paid Date</p>
                      <div className="flex items-center gap-2 text-white">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{formatDate(invoice.paidAt)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Line Items */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Items</h3>
                  <div className="bg-gray-800/50 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="text-left p-3 text-gray-300 text-sm font-medium">Description</th>
                          <th className="text-right p-3 text-gray-300 text-sm font-medium">Quantity</th>
                          <th className="text-right p-3 text-gray-300 text-sm font-medium">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.items?.map((item, index) => (
                          <tr key={index} className="border-t border-gray-700">
                            <td className="p-3 text-white">{item.description}</td>
                            <td className="p-3 text-gray-300 text-right">{item.quantity}</td>
                            <td className="p-3 text-white text-right font-semibold">
                              {formatAmount(item.amount, invoice.currency)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <span className="text-gray-400">Total</span>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <span className="text-2xl font-bold text-white">
                      {formatAmount(invoice.amount, invoice.currency)}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InvoiceDetail;

