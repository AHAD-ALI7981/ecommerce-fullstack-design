import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fingerprint, Lock, Delete, ArrowLeft } from "lucide-react";

export default function FingerprintScan() {
  const [authMethod, setAuthMethod] = useState("fingerprint"); // 'fingerprint' or 'pin'
  const [scanning, setScanning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer1, timer2;
    if (authMethod === "fingerprint" && !success) {
      setScanning(true);
      timer1 = setTimeout(() => {
        setScanning(false);
        setSuccess(true);
      }, 4000);

      timer2 = setTimeout(() => {
        navigate("/success");
      }, 6000);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [authMethod, success, navigate]);

  const handlePinInput = (digit) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      setError(false);

      if (newPin.length === 4) {
        if (newPin === "1234") {
          setSuccess(true);
          setTimeout(() => navigate("/success"), 1500);
        } else {
          setError(true);
          setTimeout(() => {
            setPin("");
            setError(false);
          }, 1000);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div
      data-theme="winter"
      className="min-h-screen w-full flex flex-col items-center justify-center text-center p-4 bg-gray-100 relative overflow-hidden font-sans"
    >
      <div className="relative z-10 flex flex-col items-center w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 transition-all duration-500">
        {authMethod === "fingerprint" ? (
          <>
            <div
              className={`rounded-full p-8 transition-all duration-500 shadow-lg ${
                success ? "bg-green-500" : "bg-blue-600"
              } ${scanning ? "ring-8 ring-blue-100 animate-pulse" : ""}`}
            >
              <Fingerprint
                size={80}
                className={`text-white transition-transform duration-500 ${
                  scanning ? "scale-95" : "scale-110"
                }`}
              />
            </div>

            <h2 className="text-2xl font-bold mt-8 text-gray-800">
              {scanning
                ? "Checking Biometrics..."
                : success
                ? "Identity Verified"
                : "Authorize Payment"}
            </h2>

            <p className="text-gray-500 mt-3 px-4 leading-relaxed">
              {scanning
                ? "Verifying your fingerprint to securely authorize this transaction."
                : success
                ? "Payment authorized successfully. Redirecting..."
                : "Place your finger on the sensor or use your PIN."}
            </p>

            {!success && (
              <button
                onClick={() => setAuthMethod("pin")}
                className="mt-10 text-blue-600 font-semibold flex items-center gap-2 hover:bg-blue-50 px-6 py-2 rounded-full transition-colors"
              >
                <Lock size={18} /> Use PIN Instead
              </button>
            )}
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center mb-6">
              <button
                onClick={() => {
                  setAuthMethod("fingerprint");
                  setPin("");
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h2 className="text-2xl font-bold flex-grow mr-8 text-gray-800">Enter PIN</h2>
            </div>

            <div className={`flex justify-center gap-4 mb-8 ${error ? "animate-shake" : ""}`}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    pin.length > i
                      ? "bg-blue-600 border-blue-600 scale-110"
                      : "border-gray-300"
                  } ${error ? "bg-red-500 border-red-500" : ""}`}
                />
              ))}
            </div>

            {error && <p className="text-red-500 text-sm mb-4 font-medium italic">Incorrect PIN, please try again.</p>}
            {success && <p className="text-green-500 text-sm mb-4 font-medium">Verified! Processing payment...</p>}

            <div className="grid grid-cols-3 gap-4 px-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePinInput(num.toString())}
                  disabled={success}
                  className="h-16 w-16 mx-auto rounded-full bg-gray-50 text-xl font-bold text-gray-700 hover:bg-gray-200 active:scale-90 transition-all shadow-sm"
                >
                  {num}
                </button>
              ))}
              <div />
              <button
                onClick={() => handlePinInput("0")}
                disabled={success}
                className="h-16 w-16 mx-auto rounded-full bg-gray-50 text-xl font-bold text-gray-700 hover:bg-gray-200 active:scale-90 transition-all shadow-sm"
              >
                0
              </button>
              <button
                onClick={handleDelete}
                disabled={success}
                className="h-16 w-16 mx-auto rounded-full flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all"
              >
                <Delete size={24} />
              </button>
            </div>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-gray-100 w-full flex flex-col items-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
            SecurePay™ Technology
          </p>
          <div className="flex gap-2 mt-2 opacity-30 grayscale">
            <div className="w-8 h-5 bg-blue-900 rounded-sm" />
            <div className="w-8 h-5 bg-red-600 rounded-sm" />
            <div className="w-8 h-5 bg-orange-500 rounded-sm" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}
