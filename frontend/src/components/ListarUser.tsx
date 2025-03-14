"use client";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";

interface UserInterface {
  id: number;
  name: string;
  email: string;
  status: boolean;
}

export default function ListarUser() {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [messegeDelete, setMessegeDelete] = useState("");

  useEffect(() => {
    api
      .get("/users")
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error(
          "Erro ao buscar usuários:",
          error.response?.data || error.message
        );
      });
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setMessegeDelete("Usuário deletado com sucesso.");
      setTimeout(() => {
        setMessegeDelete("");
      }, 3000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        console.error(
          "Erro ao deletar usuário:",
          error.response.data || error.message
        );
        setMessegeDelete("Erro ao deletar o usuário");
      } else {
        console.error("Erro ao deletar usuário:", error.message);
        alert(`Erro ao deletar o usuário: ${error.message}`);
      }
    }
  };

  return (
    <div>
      {messegeDelete && (
        <p className="border border-black/15 shadow mb-3 rounded-2xl p-3 mr-auto">{messegeDelete}</p>
      )}
      <div className="border border-black/20 rounded-2xl shadow-lg p-5">
        {users.length > 0 ? (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="text-left px-3">ID</th>
                <th className="text-left px-3">Nome</th>
                <th className="text-left px-3">Email</th>
                <th className="text-left px-3">status</th>
                <th className="text-left pb-3">Ações</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-3 pt-5">{user.id}</td>
                  <td className="px-3 pt-5 capitalize">{user.name}</td>
                  <td className="px-3 pt-5 lowercase">{user.email}</td>
                  <td className="px-3 pt-5">
                    {user.status ? (
                      <span className="relative flex size-3 group">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                        <p className="hidden group-hover:block absolute -top-1.5 left-6 bg-white border border-black/15 shadow px-5 py-1 rounded-2xl text-green-500 text-sm">
                          ativo
                        </p>
                      </span>
                    ) : (
                      <span className="relative flex size-3 group">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
                        <p className="hidden group-hover:block absolute -top-1.5 left-6 bg-white border border-black/15 shadow px-5 py-1 rounded-2xl text-red-500 text-sm">
                          Inativo
                        </p>
                      </span>
                    )}
                  </td>
                  <td className="px-3 pt-5">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 cursor-pointer transition-all"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum usuário encontrado</p>
        )}
      </div>
    </div>
  );
}
