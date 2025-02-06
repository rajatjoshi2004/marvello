
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SimpleCaptchaProps {
  onVerify: (isValid: boolean) => void;
}

export const SimpleCaptcha = ({ onVerify }: SimpleCaptchaProps) => {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput("");
    setError(false);
    setIsVerified(false);
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
    const valid = userInput === captchaText;
    setError(!valid);
    setIsVerified(valid);
    onVerify(valid);
    
    if (!valid) {
      setUserInput("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setUserInput(value);
    setError(false);
    
    // Auto-verify when input length matches captcha length
    if (value.length === captchaText.length) {
      const valid = value === captchaText;
      setError(!valid);
      setIsVerified(valid);
      onVerify(valid);
      
      if (!valid) {
        // Clear input after a short delay if incorrect
        setTimeout(() => {
          setUserInput("");
        }, 500);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md select-none font-mono text-lg tracking-wider">
          {captchaText}
        </div>
        <Button 
          type="button" 
          variant="outline" 
          onClick={generateCaptcha}
          className="h-10"
        >
          Refresh
        </Button>
      </div>
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Enter the code above"
          value={userInput}
          onChange={handleInputChange}
          maxLength={captchaText.length}
          className={`${error ? "border-red-500" : ""} ${isVerified ? "border-green-500" : ""}`}
        />
        {error && (
          <p className="text-sm text-red-500">
            Incorrect code. Please try again.
          </p>
        )}
        {isVerified && (
          <p className="text-sm text-green-500">
            Verification successful!
          </p>
        )}
      </div>
    </div>
  );
};
