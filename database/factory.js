/* eslint-disable arrow-body-style */
/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Env = use('Env')
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => ({
  avatar_url: faker.avatar(),
  name: faker.name(),
  email: faker.email(),
  phone: faker.phone({ formatted: false }),
  password: 'qwerty123',
}))
Factory.blueprint('App/Models/Party', (faker, i, data) => {
  const path = `${Env.get('APP_URL')}/images/`

  const images = ['solomun-ibiza-2015-destino.jpg', 'ibiza.jpg', 'summer.jpg', 'party.jpg']

  const paths = images.map(name => path + name)
  return {
    admin_id: data.admin.id,
    address_id: data.address.id,
    primary_picture: faker.pickone(paths),
    type: faker.pickone(['Шашлыки', 'Квартира', 'Дача', 'Пляж', 'На площади', 'Тематическая', 'Автомобили', 'Другое']),
    status: faker.pickone(['сбор участников', 'ожидание', 'проводится']),
    private: faker.bool(),
    startTime: faker.date({ year: 2018 }),
    endTime: faker.date({ year: 2018 }),
    telegram_url: 'https://t.me/joinchat/FzgsKUzTAHNJTGm6FfAWXQ',
  }
})

Factory.blueprint('App/Models/Address', (faker) => ({
  address: faker.address(),
  district: faker.pickone(['Космос', 'Шевчик', 'Бабурка', 'Вознесеновский', 'Хортицкий', 'Коммунарский', 'Заводской']),
  lat: faker.latitude(),
  lng: faker.longitude(),
  placeId: null,
}))

Factory.blueprint('App/Models/Food', (faker, i, data) => ({
  user_id: data.user.id,
  title: faker.pickone(['Пицца', 'Бургеры', 'Фарш', 'Помидоры', 'Оругры']),
  district: faker.pickone(['Космос', 'Шевчик', 'Бабурка', 'Вознесеновский', 'Хортицкий', 'Коммунарский', 'Заводской']),
  lat: faker.latitude(),
  lng: faker.longitude(),
  placeId: null,
}))
