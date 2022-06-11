import React from "react";

const User = (props) => {
  return (
    <div>
      Email:{props.email}
      Name:{props.name}
    </div>
  );
};

export default User;
