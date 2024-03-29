import React, { useState, ChangeEvent } from "react";

interface JsonInputProps {
  onChange: (value: string) => void;
  value: string;
}

const JsonInput: React.FC<JsonInputProps> = ({ onChange, value }) => {
  const [jsonInput, setJsonInput] = useState(value);
  const [isValidJson, setIsValidJson] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    setJsonInput(inputValue);

    try {
      // Attempt to parse the input as JSON
      if (inputValue || inputValue !== "") {
        JSON.parse(inputValue);
        setIsValidJson(true);
        setErrorMessage("");
        console.log()
        onChange(JSON.parse(inputValue));
      } else {
        onChange("");
        setErrorMessage("");
      }
    } catch (error: any) {
      if (inputValue !== "") {
        setIsValidJson(false);
        setErrorMessage(error.message || "Invalid JSON format");
      }else {
        onChange("");
        setErrorMessage("");
      }

    }
  };

  return (
    <div>
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        // rows={20}
        // cols={50}
        placeholder="Enter JSON here"
        className={`w-full border-2 bg-white text-black focus:outline-none rounded-md border-gray-500 ${
          isValidJson ? "border-gray-700" : "border-red-500"
        } p-5 min-h-[80vh] bg-transparent text-xs `}
      />
      {!isValidJson && (
        <div className="text-red-500 mt-2">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
    </div>
  );
};

export default JsonInput;
