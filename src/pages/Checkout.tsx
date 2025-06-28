import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from '../config';
import { useState } from "react";

const ArrowLeftIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const LockIcon = () => (
  <svg className="h-5 w-5 text-green-600 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-6V9a6 6 0 10-12 0v2a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2zm-8 0V9a4 4 0 118 0v2" />
  </svg>
);



const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen text-lg">No product selected for checkout.</div>;
  }

  const price = parseFloat(product.price.replace("$", ""));
  const subtotal = price;
  const total = subtotal; // Add tax/shipping if needed

  return (
    <PayPalScriptProvider options={{ clientId: "AS7UJQTkM9Pk2bnge64p_yL6PHL8__JmZt6ZzFDUuMEeZuSDnW8aK5Z2TxZTs94D_mv9u_K8s2s-o3zn", currency: "USD" }}>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-4 px-1 sm:py-8 sm:px-2">
        <div className="w-full max-w-md sm:max-w-xl bg-white rounded-2xl shadow-2xl p-4 sm:p-8 md:p-10 border border-gray-100 relative mx-2">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-2 top-2 sm:-left-4 sm:top-4 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-400 z-10"
            aria-label="Go back"
            type="button"
          >
            <ArrowLeftIcon />
          </button>
          {!downloadUrl && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <LockIcon />
                  <span className="text-lg font-semibold text-gray-700">Secure Checkout</span>
                </div>
                <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" className="h-7" />
              </div>

              <div className="flex flex-col items-center mb-6">
                <img src={product.image} alt={product.name} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl shadow mb-3" />
                <div className="text-lg sm:text-xl font-bold text-gray-900 mb-1 text-center break-words">{product.name}</div>
                <div className="text-gray-500 mb-2 text-center text-sm sm:text-base break-words">{product.description}</div>
              </div> 

              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-6 border border-gray-100">
                <div className="flex justify-between mb-1 text-gray-600 text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {/* Add more rows here for tax/shipping if needed */}
                <div className="flex justify-between font-bold text-base sm:text-lg mt-2">
                  <span>You pay</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div> 

              <div className="mb-4 w-full min-w-0">
                <PayPalButtons
                  style={{ layout: "horizontal", height: 48, color: "blue", shape: "pill", label: "pay" }}
                  createOrder={(_data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          description: product.name,
                          amount: {
                            currency_code: "USD",
                            value: product.price.replace("$", ""),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (_data, actions) => {
                    if (actions.order) {
                      await actions.order.capture();
                      //console.log('Checkout PayPal onApprove product:', product);
                      //console.log('Checkout PayPal onApprove fileUrl:', product.fileUrl);
                      // if (product.fileUrl) {
                      //   alert('Payment successful! Download link: ' + product.fileUrl);
                      // } else {
                      //   alert('Payment successful, but no download link found for this product.');
                      // }
                      setDownloadUrl(product.fileUrl);
                    }
                  }}
                />
              </div>
            </>
          )}



          {downloadUrl && (
            <div className="flex items-center justify-center mt-8 mb-8">
              <div className="w-full max-w-lg bg-gradient-to-br from-green-50 via-white to-green-100 rounded-2xl shadow-2xl p-8 border border-green-200 text-center animate-fade-in">
                <div className="flex justify-center mb-4">
                  <span className="text-5xl">🎉</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-green-700 mb-3">Thank you for your purchase!</div>
                <div className="text-lg text-gray-700 mb-6">Your payment was successful. You can now download your ebook below.</div>
                <a
                  href={`${BACKEND_URL}/download/${downloadUrl.split('/').pop()}`}
                  download
                  className="inline-block bg-green-600 hover:bg-green-700 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-200 mb-2"
                >
                  <span className="mr-2">⬇️</span> Download your ebook
                </a>
                <div className="text-sm text-gray-400 mt-4">Need help? Contact support if you have issues with your download.</div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center text-xs text-gray-400 mt-2">
            <LockIcon />
            <span className="truncate">Secured by PayPal</span>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;
