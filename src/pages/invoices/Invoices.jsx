import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetInvoicesQuery } from "../../services/api/invoiceApi";
import InvoiceCard from "../../components/InvoiceCard";
import InvoiceDetail from "../../components/InvoiceDetail";
import { FileText, Loader2, AlertCircle } from "lucide-react";
import { API_BASE_URL } from "../../config/api";

const Invoices = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);

  const {
    data: invoicesData,
    isLoading,
    error,
    refetch,
  } = useGetInvoicesQuery(
    { limit, offset },
    { skip: !isAuthenticated, refetchOnMountOrArgChange: true }
  );

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailOpen(true);
  };

  const handleDownloadInvoice = (invoice) => {
    if (invoice.pdfUrl) {
      window.open(invoice.pdfUrl, "_blank");
    } else {
      // Fallback: use API endpoint
      const pdfUrl = `${API_BASE_URL}/v1/invoices/${invoice.id}/pdf`;
      window.open(pdfUrl, "_blank");
    }
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedInvoice(null);
  };

  const handleLoadMore = () => {
    if (invoicesData?.hasMore) {
      setOffset((prev) => prev + limit);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className=" mt-10 min-h-screen bg-[#131B27] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#507ADB] to-[#9B49E9] flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Invoices</h1>
              <p className="text-gray-400">View your payment invoices</p>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#507ADB] animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400" />
            <div>
              <p className="text-red-400 font-semibold">Error loading invoices</p>
              <p className="text-red-300 text-sm">
                {error?.data?.error?.message || "Failed to load invoices. Please try again."}
              </p>
            </div>
            <button
              onClick={() => refetch()}
              className="ml-auto px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* Invoices List */}
        {!isLoading && !error && (
          <>
            {invoicesData?.invoices && invoicesData.invoices.length > 0 ? (
              <div className="space-y-4">
                {invoicesData.invoices.map((invoice, index) => (
                  <motion.div
                    key={invoice.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <InvoiceCard
                      invoice={invoice}
                      onView={handleViewInvoice}
                      onDownload={handleDownloadInvoice}
                    />
                  </motion.div>
                ))}

                {/* Load More Button */}
                {invoicesData.hasMore && (
                  <div className="flex justify-center pt-6">
                    <button
                      onClick={handleLoadMore}
                      className="px-6 py-3 rounded-lg font-medium text-white transition-colors"
                      style={{ background: "linear-gradient(to right, #507ADB, #9B49E9)" }}
                    >
                      Load More
                    </button>
                  </div>
                )}

                {/* Total Count */}
                <div className="text-center text-gray-400 text-sm pt-4">
                  Showing {invoicesData.invoices.length} of {invoicesData.total} invoices
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No invoices yet</h3>
                <p className="text-gray-400 mb-6">
                  Your invoices will appear here after you make a payment.
                </p>
                <button
                  onClick={() => navigate("/Pricing")}
                  className="px-6 py-3 rounded-lg font-medium text-white transition-colors"
                  style={{ background: "linear-gradient(to right, #507ADB, #9B49E9)" }}
                >
                  View Pricing Plans
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Invoice Detail Modal */}
        <InvoiceDetail
          invoice={selectedInvoice}
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
          onDownload={handleDownloadInvoice}
        />
      </div>
    </div>
  );
};

export default Invoices;

