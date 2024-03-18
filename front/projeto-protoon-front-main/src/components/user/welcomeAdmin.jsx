import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function TelaAdmin() {
  const location = useLocation();
  const { username, password } = location.state;
  console.log(username)
  console.log(password)

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
        });
      alert("Ok")
      if (response) {
      // Verifique se a role do usuário permite o acesso à página
      const userRole = "ADMIN"; // Supondo que você tenha a role do usuário armazenada em algum lugar
      if (userRole === "ADMIN") {
        const token = response.headers.authorization; // Supondo que o token esteja em um formato adequado na resposta
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:8080/welcomeUser", {
              headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data); // Se o acesso for bem-sucedido, exibe a resposta no console
          } catch (error) {
            console.error('Erro ao acessar a página de Administrador:', error);
            window.confirm('Erro ao acessar a página de Administrador')
            navigate(`/authenticate`)
          }
        };
      } else {
        // Se a role do usuário não permitir o acesso, redirecione para a página de autenticação
        window.confirm('Você não tem permissão para acessar esta página');
        navigate(`/authenticate`)
      }
    }
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