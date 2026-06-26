import { X, Printer, Download } from "lucide-react";
import { Order, SiteSettings } from "../types";

interface InvoiceBillProps {
  order: Order;
  siteSettings: SiteSettings;
  onClose: () => void;
}

export default function InvoiceBill({ order, siteSettings, onClose }: InvoiceBillProps) {

  // Recalculate subtotal from item prices (accurate for all orders)
  const computedSubtotal = order.items.reduce((sum, item) => {
    const selectedVariant = item.product.variants?.find(v =>
      v.size === item.selectedSize ||
      v.size.toLowerCase().replace(/\s+/g, '') === item.selectedSize.toLowerCase().replace(/\s+/g, '') ||
      (item.selectedSize === "50 ml" && v.size === "50ML Spray") ||
      (item.selectedSize === "12 ml" && v.size === "12ML Roll On")
    );
    const price = selectedVariant ? selectedVariant.salePrice : item.product.salePrice;
    return sum + (price * item.quantity);
  }, 0);

  // Use persisted billing breakdown if available, otherwise derive from total
  const subtotal = order.subtotal ?? computedSubtotal;
  const shippingFee = order.shippingFee ?? 0;
  const discountAmount = order.discountAmount ?? Math.max(0, subtotal + shippingFee - order.total);
  const couponCode = order.couponCode || null;
  const invoiceNumber = `INV-${order.id}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print-specific styles */}
      <style>{`
        @media print {
          body > *:not(.invoice-print-root) {
            display: none !important;
          }
          .invoice-print-root {
            position: fixed !important;
            inset: 0 !important;
            z-index: 999999 !important;
            background: white !important;
            display: block !important;
          }
          .invoice-print-root .invoice-modal-backdrop {
            display: none !important;
          }
          .invoice-print-root .invoice-modal-container {
            position: static !important;
            max-height: none !important;
            overflow: visible !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
          }
          .invoice-print-root .invoice-content {
            max-height: none !important;
            overflow: visible !important;
            padding: 20px !important;
          }
          .invoice-print-root .invoice-actions-bar {
            display: none !important;
          }
          .invoice-print-root .invoice-header-bg {
            background: #1a1714 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .invoice-print-root .invoice-status-badge {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .invoice-print-root .invoice-table-header {
            background: #f5f0eb !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .invoice-print-root .invoice-footer-bg {
            background: #faf8f5 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page {
            margin: 0.5cm;
            size: A4;
          }
        }
      `}</style>

      {/* Modal Overlay */}
      <div className="invoice-print-root fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>

        {/* Backdrop */}
        <div
          className="invoice-modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="invoice-modal-container relative bg-white w-full max-w-[680px] max-h-[92vh] rounded-2xl shadow-2xl border border-stone-200/60 flex flex-col overflow-hidden" style={{ animation: "invoiceSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}>

          {/* Action Bar (hidden in print) */}
          <div className="invoice-actions-bar flex items-center justify-between px-5 py-3 border-b border-stone-100 bg-stone-50/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider text-stone-500 uppercase">Invoice Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#2D2926] hover:bg-black text-white text-[10px] uppercase tracking-[0.12em] font-semibold rounded-lg transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5 text-stone-500" />
              </button>
            </div>
          </div>

          {/* Scrollable Invoice Content */}
          <div className="invoice-content flex-1 overflow-y-auto p-6 space-y-0" style={{ scrollbarWidth: 'thin' }}>

            {/* ─── INVOICE HEADER ─── */}
            <div className="invoice-header-bg rounded-xl px-6 py-5 mb-5" style={{ background: 'linear-gradient(135deg, #1a1714 0%, #2D2926 50%, #3d3530 100%)' }}>
              <div className="flex items-start justify-between">
                <div>
                  {siteSettings.customLogoUrl ? (
                    <img
                      src={siteSettings.customLogoUrl}
                      alt="Ruh Imperium"
                      className="h-9 mb-2 object-contain"
                      referrerPolicy="no-referrer"
                      style={{ filter: 'brightness(2) contrast(0.9)' }}
                    />
                  ) : (
                    <h1 className="text-xl font-serif tracking-[0.15em] text-white/95 mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      RUH IMPERIUM
                    </h1>
                  )}
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#D4BC96]/80 font-medium">
                    Artisanal Fragrance House
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4BC96] font-bold block">
                    TAX INVOICE
                  </span>
                  <span className="text-[9px] font-mono text-white/40 block mt-0.5">
                    {invoiceNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* ─── INVOICE META ROW ─── */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              {/* Bill To */}
              <div className="bg-stone-50/80 rounded-xl p-4 border border-stone-100">
                <span className="text-[8px] uppercase tracking-[0.2em] text-[#D4BC96] font-bold block mb-2">Bill To</span>
                <p className="text-sm font-semibold text-stone-900 leading-tight">{order.fullName}</p>
                <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">{order.address}</p>
                <p className="text-[11px] font-mono font-bold text-stone-700 mt-1">PIN: {order.pincode}</p>
                <div className="flex flex-col gap-0.5 mt-2">
                  <span className="text-[10px] text-stone-400">📧 {order.email}</span>
                  <span className="text-[10px] text-stone-400">📱 +91 {order.phone}</span>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="bg-stone-50/80 rounded-xl p-4 border border-stone-100">
                <span className="text-[8px] uppercase tracking-[0.2em] text-[#D4BC96] font-bold block mb-2">Invoice Details</span>
                <div className="space-y-2">
                  <div>
                    <span className="text-[9px] text-stone-400 uppercase tracking-wider block">Invoice No.</span>
                    <span className="text-[11px] font-mono font-bold text-stone-800">{invoiceNumber}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-400 uppercase tracking-wider block">Date</span>
                    <span className="text-[11px] font-mono text-stone-700">{order.date}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-400 uppercase tracking-wider block">Payment</span>
                    <span className="text-[11px] font-mono text-stone-700">{order.paymentMode}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-400 uppercase tracking-wider block">Status</span>
                    <span className={`invoice-status-badge text-[10px] font-mono font-bold px-2 py-0.5 rounded inline-block ${
                      order.status === "Delivered" ? "bg-emerald-100 text-emerald-800" :
                      order.status === "Cancelled" ? "bg-red-100 text-red-700" :
                      order.status === "Dispatched" ? "bg-indigo-100 text-indigo-700" :
                      order.status === "In Transit" ? "bg-amber-100 text-amber-700" :
                      "bg-stone-100 text-stone-600"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── ITEMS TABLE ─── */}
            <div className="mb-5">
              <table className="w-full text-left" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr className="invoice-table-header" style={{ background: '#f5f0eb' }}>
                    <th className="text-[8px] uppercase tracking-[0.15em] font-bold text-stone-500 py-2.5 px-3 rounded-tl-lg">#</th>
                    <th className="text-[8px] uppercase tracking-[0.15em] font-bold text-stone-500 py-2.5 px-3">Product</th>
                    <th className="text-[8px] uppercase tracking-[0.15em] font-bold text-stone-500 py-2.5 px-3 text-center">Size</th>
                    <th className="text-[8px] uppercase tracking-[0.15em] font-bold text-stone-500 py-2.5 px-3 text-center">Qty</th>
                    <th className="text-[8px] uppercase tracking-[0.15em] font-bold text-stone-500 py-2.5 px-3 text-right">Unit Price</th>
                    <th className="text-[8px] uppercase tracking-[0.15em] font-bold text-stone-500 py-2.5 px-3 text-right rounded-tr-lg">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => {
                    const selectedVariant = item.product.variants?.find(v =>
                      v.size === item.selectedSize ||
                      v.size.toLowerCase().replace(/\s+/g, '') === item.selectedSize.toLowerCase().replace(/\s+/g, '') ||
                      (item.selectedSize === "50 ml" && v.size === "50ML Spray") ||
                      (item.selectedSize === "12 ml" && v.size === "12ML Roll On")
                    );
                    const unitPrice = selectedVariant ? selectedVariant.salePrice : item.product.salePrice;
                    const lineTotal = unitPrice * item.quantity;

                    return (
                      <tr key={idx} className="border-b border-stone-100 last:border-b-0 hover:bg-stone-50/30">
                        <td className="py-3 px-3 text-[10px] text-stone-400 font-mono">{idx + 1}</td>
                        <td className="py-3 px-3">
                          <span className="text-[11.5px] font-medium text-stone-800 block leading-tight">{item.product.name}</span>
                          {item.product.category && (
                            <span className="text-[9px] text-stone-400 block mt-0.5">{item.product.category}</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-[10.5px] text-stone-600 font-mono text-center">{item.selectedSize}</td>
                        <td className="py-3 px-3 text-[10.5px] text-stone-700 font-mono text-center font-bold">{item.quantity}</td>
                        <td className="py-3 px-3 text-[10.5px] text-stone-600 font-mono text-right">₹{unitPrice.toLocaleString('en-IN')}</td>
                        <td className="py-3 px-3 text-[11px] text-stone-900 font-mono text-right font-bold">₹{lineTotal.toLocaleString('en-IN')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ─── TOTALS SECTION ─── */}
            <div className="flex justify-end mb-5">
              <div className="w-full max-w-[280px] space-y-0">
                {/* Subtotal */}
                <div className="flex justify-between items-center py-2 border-b border-stone-100">
                  <span className="text-[11px] text-stone-500">Subtotal</span>
                  <span className="text-[11.5px] font-mono text-stone-700">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between items-center py-2 border-b border-stone-100">
                  <span className="text-[11px] text-stone-500">Shipping</span>
                  <span className="text-[11.5px] font-mono text-stone-700">
                    {shippingFee > 0 ? `₹${shippingFee.toLocaleString('en-IN')}` : 'FREE'}
                  </span>
                </div>

                {/* Discount */}
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-[11px] text-emerald-700">
                      Discount {couponCode ? `(${couponCode})` : ''}
                    </span>
                    <span className="text-[11.5px] font-mono text-emerald-700 font-semibold">
                      −₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                {/* Grand Total */}
                <div className="flex justify-between items-center py-3" style={{ background: 'linear-gradient(90deg, transparent, #f5f0eb 30%)' }}>
                  <span className="text-[12px] font-bold text-stone-900 uppercase tracking-wider">Grand Total</span>
                  <span className="text-[16px] font-mono font-bold text-stone-900">₹{order.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* ─── TRACKING INFO ─── */}
            {(order.trackingCode || order.courierService) && (
              <div className="bg-[#D4BC96]/8 rounded-xl p-4 border border-[#D4BC96]/20 mb-5">
                <span className="text-[8px] uppercase tracking-[0.2em] text-[#D4BC96] font-bold block mb-2">Shipment Information</span>
                <div className="flex flex-wrap gap-6">
                  {order.trackingCode && (
                    <div>
                      <span className="text-[9px] text-stone-400 uppercase tracking-wider block">Tracking Code</span>
                      <span className="text-[12px] font-mono font-bold text-stone-800 tracking-wider">{order.trackingCode}</span>
                    </div>
                  )}
                  {order.courierService && (
                    <div>
                      <span className="text-[9px] text-stone-400 uppercase tracking-wider block">Courier Service</span>
                      <span className="text-[12px] font-mono font-bold text-stone-800">{order.courierService}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ─── FOOTER ─── */}
            <div className="invoice-footer-bg rounded-xl p-4 text-center" style={{ background: '#faf8f5' }}>
              <p className="text-[10px] text-stone-500 leading-relaxed">
                Thank you for choosing <span className="font-semibold text-stone-700">Ruh Imperium</span>. Each fragrance is handcrafted with artisanal care.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-[9px] text-stone-400">
                {siteSettings.contactEmail && <span>✉ {siteSettings.contactEmail}</span>}
                {siteSettings.contactPhone && <span>☎ {siteSettings.contactPhone}</span>}
              </div>
              {siteSettings.contactAddress && (
                <p className="text-[9px] text-stone-400 mt-1">{siteSettings.contactAddress}</p>
              )}
              <p className="text-[8px] text-stone-300 mt-3 font-mono">
                This is a computer-generated invoice and does not require a signature.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes invoiceSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}
