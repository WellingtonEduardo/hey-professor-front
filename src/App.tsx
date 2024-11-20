
import { Sanctum } from "react-sanctum";
import { Router } from "./Route";
import { httpClient } from "./app/services/httpClient";

const sanctumConfig = {
  apiUrl: "http://localhost:8000",
  csrfCookieRoute: "sanctum/csrf-cookie",
  signInRoute: "login",
  signOutRoute: "logout",
  userObjectRoute: "user",
  axiosInstance: httpClient

};

export default function App() {

  return (<div className="my-application">
    <Sanctum config={sanctumConfig} >
      <Router />
    </Sanctum>
  </div>)
}
