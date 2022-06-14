import React from "react";
import Header from "./components/shared/Header";
import Main from "./components/shared/Main";

//declarando o componente como função
//export default -> visibilidade publica
export default function App() {
  //conteúdo HTML renderizado pelo componente
  return (
    <div>
      <Header />
      <Main />
    </div>
  )
}