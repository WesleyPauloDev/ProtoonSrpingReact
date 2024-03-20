import { useNavigate, Link, useLocation } from "react-router-dom";
  
const TelaUser = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { username = '', role = '' } = location.state || {};

  if (role != 'ROLE_ADMIN') {
    navigate(`/authenticate`)
    window.confirm('Você não tem permissão para acessar esta página');
  }

  return (
    <div>
      <h1>Bem-vindo, Municípe {username}</h1>
      <Link to="/authenticate">Voltar</Link><br></br><br></br>
    </div>
  );
}

export default TelaUser;