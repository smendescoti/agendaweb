//Validação para o campo nome
export const nomeValidation = (value) => {
    if (value.trim().length < 6)
        return 'Por favor, informe um nome com no mínimo 6 caracteres.';

    return true;
}

//Validação para o campo email
export const emailValidation = (value) => {
    if (value.trim().length == 0)
        return 'Por favor, informe o email do contato.';
    else if (!/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(value))
        return 'Por favor, informe um endereço de email válido.'

    return true;
}

//Validação para o campo telefone
export const telefoneValidation = (value) => {
    if (value.trim().length == 0)
        return 'Por favor, informe o telefone do contato.';

    return true;
}