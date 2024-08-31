import React from "react";

const TodoCard = () => {
  return (
    <>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Shirt</h3>
        </div>
        <div className="panel-body">
            <span>Price: 600</span>
            <span>Quantity: 1</span>
            <span>Paid: 0</span>
        </div>
      </div>
    </>
  );
};

export default TodoCard;
