import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function TelaUser() {
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
                username: "user",
                password: "123456"
            }
        });
      // alert("Ok")
    //   if (response) {
    //   // Verifique se a role do usuário permite o acesso à página
    //   const userRole = "ROLE_MUNICIPE"; // Supondo que você tenha a role do usuário armazenada em algum lugar
    //   if (userRole === "ROLE_MUNICIPE") {
    //     const token = response.headers.authorization; // Supondo que o token esteja em um formato adequado na resposta
    //     const fetchData = async () => {
    //       try {
    //         const response = await axios.get("http://localhost:8080/welcomeUser", {
    //           headers: { Authorization: `Bearer ${token}` }
    //         });
    //         console.log(response.data); // Se o acesso for bem-sucedido, exibe a resposta no console
    //       } catch (error) {
    //         console.error('Erro ao acessar a página de Municipe:', error);
    //         window.confirm('Erro ao acessar a página de Municipe')
    //         navigate(`/authenticate`)
    //       }
    //     };
    //   } else {
    //     // Se a role do usuário não permitir o acesso, redirecione para a página de autenticação
    //     window.confirm('Você não tem permissão para acessar esta página');
    //     navigate(`/authenticate`)
    //   }
    // }
  } catch (error) {
    console.error('Erro ao acessar a página de Municipe:', error);
            window.confirm('Erro ao acessar a página de Municipe')
            navigate(`/authenticate`)
  }
};
  
  return (
    <div>
      <h1>Bem-vindo, Municipe</h1>
      <Link to="/authenticate">Voltar</Link><br></br><br></br>
      <button onClick={handleSubmit}>Verificar Acesso</button>
    </div>
  );
}

export default TelaUser;
