import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginFormAuth() {
  const token = ""

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/users');
      const users = response.data;
      const user = users.find(u => u.username === username && u.password === password);
      if (user) { 
        console.log('Login bem-sucedido!');
        alert('Login bem-sucedido!');
        if (user.role === 'ADMIN') {
          navigate('/welcomeAdmin', { state: { username, password } });
        } else {
          navigate('/welcomeUser', { state: { username, password } });
        }
      } else {
        alert('Credenciais inválidas. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar os usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (username) => {
    try {
        if (window.confirm('Tem certeza que deseja remover este usuário?')) {
            await axios.delete(`http://localhost:8080/users/${username}`);
            setUsers(users.filter(user => user.username !== username));
            alert('Usuário deletado com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao deletar o usuário:', error);
        alert('Erro ao deletar o usuário. Por favor, tente novamente.');
    }
};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <label>Username </label><br></br>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /><br></br><br></br>
        </div>
        <div>
          <label>Password </label><br></br>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br></br>
        </div><br></br>
        <button type="submit">Login</button>
        <br />
        <br />
        <Link to="/registerUser">cadastre-se</Link>
      </form>      
      <div>
        <h3>Lista de Usuários</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
        {users.map((user, index) => (
          <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
          
            <div>User: {user.username}</div>
            <div>Role: {user.role ? user.role : "MUNICIPE"}</div>
            <div>
              <button onClick={() => handleDelete(user.username)}>Excluir</button>
            </div>
            <div>
            <button onClick={() => navigate(`/updateUser/${user.username}`)}>Editar</button>
            </div>
          
        </div>
        ))}
        </ul>
      </div>
    </div>
  );
}

export default LoginFormAuth;
