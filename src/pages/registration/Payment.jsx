import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadioGroup, Radio, Input, Checkbox } from "@nextui-org/react";
import { BsBank2, BsCreditCard2Front } from "react-icons/bs";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { SiStencyl } from "react-icons/si";
import { GiTakeMyMoney } from "react-icons/gi";
import PaymentSuccessModal from "./PaymentSuccessModal";

function Payment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePaymentComplete = () => {
    // Here you would typically process the payment
    // After successful payment:
    setShowSuccessModal(true);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-3 gap-8">
          {/* Payment Methods Section */}
          <div className="col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl mb-6">Payment Type</h2>

            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="gap-4"
            >
              <div className="space-y-4">
                <div
                  className={`p-4 border rounded-lg transition-all ${
                    paymentMethod === "bank"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <Radio value="bank" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <BsBank2 className="text-xl" />
                      <span>Bank Transfer</span>
                    </div>
                  </Radio>
                </div>

                <div
                  className={`p-4 border rounded-lg transition-all ${
                    paymentMethod === "card"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <Radio value="card" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <FaCcVisa className="text-2xl text-blue-700" />
                        <FaCcMastercard className="text-2xl text-red-500" />
                      </div>
                      <span>Visa / Master Card</span>
                    </div>
                  </Radio>
                </div>

                <div
                  className={`p-4 border rounded-lg transition-all ${
                    paymentMethod === "debit"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <Radio value="debit" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <BsCreditCard2Front className="text-xl" />
                      <span>Credit/Debit card</span>
                    </div>
                  </Radio>
                </div>

                <div
                  className={`p-4 border rounded-lg transition-all ${
                    paymentMethod === "stc"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <Radio value="stc" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <SiStencyl className="text-xl" />
                      <span>STC Pay</span>
                    </div>
                  </Radio>
                </div>

                <div
                  className={`p-4 border rounded-lg transition-all ${
                    paymentMethod === "tabby"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <Radio value="tabby" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <GiTakeMyMoney className="text-xl" />
                      <span>Tabby</span>
                    </div>
                  </Radio>
                </div>
              </div>
            </RadioGroup>

            {/* Card Details Section - Show only when card is selected */}
            {(paymentMethod === "card" || paymentMethod === "debit") && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg mb-4">Credit card / debit card</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Card number</label>
                    <Input
                      placeholder="1234 1234 1234 1234"
                      className="max-w-md"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm mb-1">
                        Expiration date
                      </label>
                      <Input placeholder="MM / YY" className="max-w-[200px]" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm mb-1">
                        Security code
                      </label>
                      <Input placeholder="CVC" className="max-w-[100px]" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6">
              <Checkbox
                checked={acceptTerms}
                onChange={setAcceptTerms}
                size="sm"
              >
                Accept the Terms & Conditions (
                <a href="#" className="text-blue-500 hover:underline">
                  Download Terms & Conditions
                </a>
                )
              </Checkbox>
            </div>
          </div>

          {/* Payment Summary Section */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <h2 className="text-xl mb-6">Payment</h2>
            <div className="space-y-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-medium">AED 72.00</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Total Qty:</span>
                <span>2 Barcodes</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">VAT (0%):</span>
                <span>0.00</span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span className="text-gray-600">Overall Amount:</span>
                <span className="font-medium">AED 72.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate("/register/barcodes")}
            className="px-6 py-2 border border-navy-600 text-navy-600 rounded-lg hover:bg-navy-50"
          >
            Previous
          </button>
          <button
            onClick={handlePaymentComplete}
            className="px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700"
            disabled={!acceptTerms}
          >
            Complete Payment
          </button>
        </div>
      </div>

      {/* Success Modal */}
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
}

export default Payment;
