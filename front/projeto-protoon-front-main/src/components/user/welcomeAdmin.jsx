import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function TelaAdmin() {
  const location = useLocation();
  const { username, password } = location.state;

  const navigate = useNavigate();
  const [username1, setUsername] = useState("");
  const [password1, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:8080/private", {
        auth: {
          username: "Wesley",
          password: "123456"
        }
      })
    //   .then(response => {
    //     const token = ".eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzcHJpbmctc2VjdXJpdHktand0Iiwic3ViIjoiV2VzbGV5IiwiZXhwIjoxNzEwNzczOTkzLCJpYXQiOjE3MTA3NzM5ODMsInNjb3BlIjoiUk9MRV9BRE1JTiJ9.uBkhHIvNRh_FbsppqeE66iN7Z95n7CpAOuuK1fBQVTO-pieVCko3ipS0gpxPIyr-y9S1GEwWdi3b6iV-IePdcBDmFlUWAp1bVzJcq6UmUUCOJtqofHa1MSJXcIXzEzMVVI1erj6ulVeZV_tdPMg8LQOtXJUwKZSsSX8YbI9ejf63kO6fV5l_0dKVfvcuWh9PPg2HxOBSCXXBfqe5uB2v67XJ_YKVo39mT8w8EzlK6X1LcnQt5GNsrVC3uVJGvelNaSRJMxfVgQ2s-hd4jCih38rE-TF9_09NwKtNTItLwg27IYrDz8452N12P5mIcS2Y3_nMPFQi2O5ZnZmO8TQMlA";
    //     // const token = response.data.token;
    //     if (response) {
    //       // Verifique se a role do usuário permite o acesso à página
    //       const userRole = "ROLE_ADMIN"; // Supondo que você tenha a role do usuário armazenada em algum lugar
    //       if (userRole === "ROLE_ADMIN") {
    //         // const token = response.headers.authorization; // Supondo que o token esteja em um formato adequado na resposta
    //         // const fetchData = async () => {
    //         try  {
    //           alert(token)
    //           const response = axios.get("http://localhost:8080/welcomeAdmin", {
    //             headers: { Authorization: `Bearer ${token}` }
    //           });
    //           console.log(response.data); // Se o acesso for bem-sucedido, exibe a resposta no console
    //         } catch (error) {
    //           console.error('Erro ao acessar a página de Administrador:', error);
    //           window.confirm('Erro ao acessar a página de Administrador')
    //           navigate(`/authenticate`)
    //         }
    //     // }
    //     };
    //   } else {
    //     // Se a role do usuário não permitir o acesso, redirecione para a página de autenticação
    //     window.confirm('Você não tem permissão para acessar esta página');
    //     navigate(`/authenticate`)
    //   }
    // })
    
    } catch (error) {
    console.error('Erro ao acessar a página de Administrador:', error);
    window.confirm('Erro ao acessar a página de Administrador')
    navigate(`/authenticate`)
  }
};

return (
  <div>
    <h1>Bem-vindo, Admin</h1>
    <Link to="/authenticate">Voltar</Link><br></br><br></br>
    <button onClick={handleSubmit}>Verificar Acesso</button>
  </div>
);
}

export default TelaAdmin;
