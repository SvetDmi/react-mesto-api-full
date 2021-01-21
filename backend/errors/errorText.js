const error400 = { message: 'Миссия невыполнима, проверьте правильность введенных данных' };
const error500 = { message: 'Сервер не отвечает, попробуйте позже' };
const error404 = { message: 'Миссия невыполнима, запрашиваемый ресурс не найден' };
const error401 = { message: 'Неправильная почта или пароль' };

module.exports = { error400, error404, error500 };
