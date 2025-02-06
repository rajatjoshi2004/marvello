
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

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput("");
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
    const isValid = userInput === captchaText;
    setError(!isValid);
    onVerify(isValid);
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
          onChange={(e) => {
            setUserInput(e.target.value.toUpperCase());
            setError(false);
          }}
          className={error ? "border-red-500" : ""}
        />
        {error && (
          <p className="text-sm text-red-500">
            Incorrect code. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};
