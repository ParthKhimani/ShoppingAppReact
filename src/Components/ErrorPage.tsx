import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("error-page");
  };
  return (
    <>
      <center>
        <h1>Some error accured in payment, please go back to dashboard</h1>
        <button onClick={handleClick}>Go back to Dasboard</button>
      </center>
    </>
  );
};
export default ErrorPage;
