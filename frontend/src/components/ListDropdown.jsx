import React, { useState } from "react";

const ListDropdown = ({ lists = [], onSelectList, gameId }) => {
const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="list-dropdown" style={{ position: "relative", display: "inline-block" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add to List
        </button>
        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "0",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              zIndex: "1000",
              minWidth: "150px",
            }}
          >
            {lists.map((list) => (
              <div
                key={list._id} 
                onClick={() => {
                  onSelectList(list._id, gameId); 
                  setIsOpen(false);
                }}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd",
                  color: "#333",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#fff")}
              >
                {list.category}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default ListDropdown;
  