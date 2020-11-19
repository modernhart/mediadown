import React from "react";

const Loader = () => {
  return (
    <div style={{top: 0, left: 0}} className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
    </div>
  );
}

export default Loader;