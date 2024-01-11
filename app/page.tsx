"use client";

import JsonForm from "@/components/jsonform";
import JsonInput from "@/components/jsoninput";
import React, { useState } from "react";

export default function Home() {
  const [uiSchema, setUiSchema] = useState<any>();

  const handleChange = (data: any) => {
    data.sort((a: any, b: any)=>a.sort - b.sort)
    setUiSchema(data);
  };

  return (
    <div className="grid grid-cols-2 mt-10 gap-10">
      <div className="max-h-[90vh] w-4/5">
        <JsonInput onChange={handleChange} value={uiSchema} />
      </div>
      <div className="w-full h-full">
        <JsonForm formData={uiSchema} />
      </div>
    </div>
  );
}
