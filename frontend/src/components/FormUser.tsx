"use client";

import { useState } from "react";
import { api } from "@/lib/api"; // Certifique-se de que você tem o Axios configurado no arquivo 'api'

interface UserInterface {
  name: string;
  email: string;
  status: boolean;
}

export default function FormUser() {
  // Estado para os campos do formulário
  const [userData, setUserData] = useState<UserInterface>({
    name: "",
    email: "",
    status: true, // ou qualquer valor inicial
  });

  // Função para lidar com a alteração dos campos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para enviar os dados do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário
    try {
      // Envia os dados do usuário para a API usando o método POST
      const response = await api.post("/users", userData);
      console.log("Usuário criado:", response.data);
      alert("Usuário criado com sucesso!");
      setUserData({ name: "", email: "", status: true }); // Reseta os campos após o envio
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar o usuário.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-100 px-4 py-10 rounded-2xl">
      <div className="grid grid-cols-2 gap-2 max-w-lg mx-auto">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={userData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
            required
          />
        </div>

        <div className="col-span-2">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={userData.status ? "true" : "false"}
            onChange={(e) =>
              handleInputChange({
                target: { name: "status", value: e.target.value === "true" },
              })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
          >
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </div>

        <button
          type="submit"
          className="col-span-2 p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer mt-3"
        >
          Criar Usuário
        </button>
      </div>
    </form>
  );
}
