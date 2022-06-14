//Validação para o campo email
export const emailValidation = (value) => {
    if (value.trim().length == 0)
        return 'Por favor, informe o seu email de acesso.';
    else if (!/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(value))
        return 'Por favor, informe um endereço de email válido.'

    return true;
}

//Validação para o campo senha
export const senhaValidation = (value) => {
    if (value.trim().length < 8)
        return 'Por favor, informe sua senha com no mínimo 8 caracteres.';
    else if (value.trim().length > 20)
        return 'Por favor, informe sua senha com no máximo 20 caracteres.';

    return true;
}