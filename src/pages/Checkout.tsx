import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation, useNavigate } from "react-router-dom";

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

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen text-lg">No product selected for checkout.</div>;
  }

  const price = parseFloat(product.price.replace("$", ""));
  const subtotal = price;
  const total = subtotal; // Add tax/shipping if needed

  return (
    <PayPalScriptProvider options={{ clientId: "Ab7xJL4UIXw8UyiAvTbiQaD4CTCeEIQUGMmXIy3lEQKjhDGzYWNOwjUSz1k8uzL_yQD_NeWfOobNfSJV", currency: "USD" }}>
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
                  const details = await actions.order.capture();
                  alert("Transaction completed by " + (details.payer?.name?.given_name || "Customer"));
                }
              }}
            />
          </div>

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
