import { useNavigate, Link, useLocation } from "react-router-dom";

function TelaAdmin() {
  const location = useLocation();
  const { username = '', password = '' } = location.state || {};

  const navigate = useNavigate();

return (
  <div>
    <h1>Bem-vindo, Admin {username}</h1>
    <Link to="/authenticate">Voltar</Link><br></br><br></br>
  </div>
);
}

export default TelaAdmin;
