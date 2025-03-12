import React, { useState } from "react";

const RemoveFromListDropdown = ({ lists = [], onRemoveFromList, gameId }) => {
  const [isOpen, setIsOpen] = useState(false);

  //Filter lists that contain this game
  const filteredLists = lists.filter((list) => list.games.includes(gameId));

  return (
    <div className="list-dropdown" style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        style={{
          padding: "8px 16px",
          backgroundColor: "#ff4d4d", // Red color for remove
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Remove from List
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
          {filteredLists.length > 0 ? (
            filteredLists.map((list) => (
              <div
                key={list._id}
                onClick={() => {
                  onRemoveFromList(list._id, gameId);
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
            ))
          ) : (
            <div style={{ padding: "8px 16px", color: "#888" }}>
              Game is not in any lists!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RemoveFromListDropdown;
