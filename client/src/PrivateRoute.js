import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, path, ...rest }) {

  const token = localStorage.getItem("token");
  const [route, setRoute] = useState("");
  const loginUrl='/login';

  console.log(token, 'token')


  return (
      <Route
        {...rest}
        render={(props) => {
          if (token != null && token.length > 10) {
              return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: loginUrl,
                  state: { referer: props.location },
                }}
              />
            );
          }
        
        }}
      />
  );

}



export default PrivateRoute;
