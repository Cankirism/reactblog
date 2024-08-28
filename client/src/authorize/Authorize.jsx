import { useJwt } from "react-jwt";
import { useHistory } from "react-router-dom";
const Authorize = ({ children }) => {
  const history = useHistory();
  const accessToken = localStorage.getItem("token");
  const jwtToken = useJwt(accessToken);
  if (!accessToken || jwtToken.isExpired) {
    history.push("/login");
  }
  return children;
};
export default Authorize;
