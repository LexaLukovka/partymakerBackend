const moment = require('moment')

module.exports = [
  {
    address: {
      address: 'Южный Південний Запорожье Запорожская область 69000',
      lat: -60.07511,
      lng: 0.42462,
      district: 'Пески',
    },
    title: 'Шашлыки',
    type: 'picnic',
    pictures: [
      'http://0.0.0.0:3333/images/summer.jpg',
      'http://0.0.0.0:3333/images/solomun-ibiza-2015-destino.jpg',
      'http://0.0.0.0:3333/images/ibiza.jpg',
    ],
    telegram_url: 'https://t.me/joinchat/FzgsKUzTAHNJTGm6FfAWXQ',
    description: 'Давайте скинемся по 200 грн. Я куплю мяса и пивасика. Посидим поболтаем',
    start_time: moment.now(),
    people_max: 10,
    people_min: 2,
    private_party: false,
  },
  {
    address: {
      address: 'Ждановский пляж Запорожье, Запорожская область, 69000',
      lat: -60.07511,
      lng: 0.42462,
      district: 'Вознесеновский',
    },
    title: 'Вечеринка на пляже',
    type: 'picnic',
    pictures: [
      'http://0.0.0.0:3333/images/summer.jpg',
      'http://0.0.0.0:3333/images/solomun-ibiza-2015-destino.jpg',
      'http://0.0.0.0:3333/images/ibiza.jpg',
    ],
    telegram_url: 'https://t.me/joinchat/FzgsKUzTAHNJTGm6FfAWXQ',
    description: 'Пойдем поплаваем. Поиграем во велейбол',
    start_time: moment.now(),
    people_max: 10,
    people_min: 2,
    private_party: false,
  },
]
