import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

const OtpVerificationModal = ({ isOpen, onOpenChange, onVerify, email }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = Array(4)
    .fill(0)
    .map(() => React.createRef());

  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", ""]);
      setTimeout(() => inputRefs[0].current?.focus(), 100);
    }
  }, [isOpen]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    if (newOtp.every((digit) => digit) && newOtp.join("").length === 4) {
      onVerify(newOtp.join(""));
      onOpenChange(false);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    onVerify(otp.join(""));
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-xl">Email Verification</h3>
              <p className="text-sm text-default-500">
                Enter the 4-digit code sent to {email}
              </p>
              <p className="text-xs text-default-400">
                (Use 1234 for testing successful verification)
              </p>
            </ModalHeader>

            <ModalBody>
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14"
                    classNames={{
                      input: "text-center text-xl",
                      inputWrapper: "h-14",
                    }}
                    size="lg"
                  />
                ))}
              </div>
            </ModalBody>

            <ModalFooter className="flex flex-col items-center">
              <p className="text-sm text-default-500 mb-4">
                Didn't receive the code?{" "}
                <Button
                  variant="light"
                  className="text-navy-600 p-0"
                  onPress={() => {
                    console.log("Resend OTP");
                  }}
                >
                  Resend
                </Button>
              </p>
              <div className="flex gap-2 justify-end w-full">
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-navy-600 text-white hover:bg-navy-700"
                  onClick={handleVerify}
                  isDisabled={!otp.every((digit) => digit)}
                >
                  Verify
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OtpVerificationModal;
