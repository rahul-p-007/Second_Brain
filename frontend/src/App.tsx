import React from "react";
import Button from "./components/Button";
import { FaPlus } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
function App() {
  const handleClick = () => {};
  return (
    <div>
      <Button
        variant="secondary"
        text="Share"
        size="lg"
        startIcon={<FaShare />}
      />
      <Button
        variant="primary"
        text="Add Content"
        size="sm"
        startIcon={<FaPlus />}
      />
    </div>
  );
}

export default App;
