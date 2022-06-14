//função para salvar os dados obtidos da autenticação
//do usuário em uma local storage
export const signIn = (data) => {

    //converter os dados de JSON para string
    var content = JSON.stringify(data);

    //salvar na local storage
    localStorage.setItem('AUTH_DATA', content);
}

//função para apagar o conteudo salvo na local storage
export const signOut = () => {
    localStorage.removeItem('AUTH_DATA');
}

//função para ler o nome do usuário
export const getNomeUsuario = () => {
    //lendo o conteudo gravado na local storage
    var json = JSON.parse(localStorage.getItem('AUTH_DATA'));
    return json.nome;
}

//função para ler o email do usuário
export const getEmailUsuario = () => {
    //lendo o conteudo gravado na local storage
    var json = JSON.parse(localStorage.getItem('AUTH_DATA'));
    return json.email;
}

//função para ler o token de acesso
export const getAccessToken = () => {
    //lendo o conteudo gravado na local storage
    var json = JSON.parse(localStorage.getItem('AUTH_DATA'));
    return json.accessToken;
}

//função para verificar se há um usuário autenticado
export const isAuthenticated = () => {
    return localStorage.getItem('AUTH_DATA') != null;
}