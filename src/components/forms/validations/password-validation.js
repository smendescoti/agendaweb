//Validação para o campo email
export const emailValidation = (value) => {
    if (value.trim().length == 0)
        return 'Por favor, informe o seu endereço de email.';
    else if (!/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(value))
        return 'Por favor, informe um endereço de email válido.'

    return true;
}