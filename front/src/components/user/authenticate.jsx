import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginFormAuth() {
  const token = "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzcHJpbmctc2VjdXJpdHktand0Iiwic3ViIjoiV2VzbGV5IiwiZXhwIjoxNzEwNzk0OTY4LCJpYXQiOjE3MTA3OTQ5NTgsInNjb3BlIjoiUk9MRV9BRE1JTiJ9.yByeV3sA_VOAzo5U-yHDz48e6i33aeBf2oZSLCRRIBjKS5M3ZUuTapqgWpBnaV5b2QKGID0UveyFzQYmq4YbagLd29QFFYvcnXz7Xtd_dQyw-ICmU1gyUSqykKt8uuUpj3ALsdunt4TmEQ-5TQy0eM_x6eOZx66TXcPDlPzD6eFlTlJcxrZ5LSCIXejkypo-jC8-KUu8HSMyzSykjKHHPWslfsw631Pbb0CWsqMm6E2e9oZET6f8Czlqo7_3q2L4KvlF5JMN6O6qnJ1Or1i1StvSzI3eEiOJur078Ajtj-2YJxEAZcpDXZ4zUOnQEBtNoyozbPfnVKd28phsDgUmbA"

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:8080/check/${username}?password=${password}`, {
      auth: {
        username: "Admin",
        password: "Admin"
      }
    })
    try {
      const response = await axios.get('http://localhost:8080/users', {
        auth: {
          username: "Admin",
          password: "Admin"
        }
      });
      const users = response.data;
      alert(users[4].username)
      alert(users[0].password)
      alert(password)
      alert(username)
      const user = users.find(u => u.username === username && u.password === password);
      if (user) { 
        console.log('Login bem-sucedido!');
        alert('Login bem-sucedido!');
        if (user.role === 'ROLE_ADMIN') {
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

  //   try {
  //     const response = await axios.get('http://localhost:8080/users');
  //     const users = response.data;
  //     const user = users.find(u => u.username === username && u.password === password);
  //     if (user) { 
  //       console.log('Login bem-sucedido!');
  //       alert('Login bem-sucedido!');
  //       if (user.role === 'ROLE_ADMIN') {
  //         navigate('/welcomeAdmin', { state: { username, password } });
  //       } else {
  //         navigate('/welcomeUser', { state: { username, password } });
  //       }
  //     } else {
  //       alert('Credenciais inválidas. Verifique suas credenciais.');
  //     }
  //   } catch (error) {
  //     console.error('Erro ao enviar os dados:', error);
  //     alert('Erro ao fazer login. Verifique suas credenciais.');        
  //   }
  // };
  
  
  //     const response = axios.post('http://localhost:8080/users/check-password', {
  //       auth: {
  //         username: "Wesley2",
  //         password: "$2a$10$F8Rrr.MBTso5.RDnqt1TKOyr5PSPgE842B7.7kdfV5vM.CuKZTvPy"
  //     }
  //     // headers: { Authorization: `Bearer ${token}` }
  //   })
  //   .then(response => {
  //       alert('OK');
  //         if (response.data) {
  //             console.log('Senha válida');
  //         } else {
  //             console.log('Senha inválida');
  //         }
  //     })
  //     .catch(error => {
  //         alert('Erro ao verificar senha');

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
