/* eslint-disable arrow-body-style,max-len */
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
Factory.blueprint('App/Models/Group', (faker, i, data) => {
  const bool = faker.bool()
  return {
    admin_id: data.admin.id,
    address_id: bool ? data.address.id : null,
    place_id: bool ? null : data.place.id,
    event_id: bool ? null : data.event.id,
    title: faker.pickone(['Идем шашлыки', 'Гуляем в квартире', 'Едем на дачу', 'Идем на пляж', 'На площади', 'Автомобили', 'Другое']),
    date: faker.date({ year: 2018 }),
    description: faker.paragraph({ sentences: 1 }),
  }
})

Factory.blueprint('App/Models/Address', (faker) => ({
  address: faker.pickone([
    'вулиця Слобідська, Запоріжжя, Запорізька область, 69000',
    'Южный Південний Запорожье Запорожская область 69000',
    'Ждановский пляж Запорожье, Запорожская область, 69000',
    'Пляж Натальевского карьера, Наталівка, Запорожская область адрес',
    'вул. Чубанова, Запоріжжя, Запорізька, 69000',
    'Прибережна автомагістраль 72Б Запоріжжя Запорізька область 69000, Запоріжжя, Запорізька область, 69000',
    'Таганська вул., Залізний міст, Запоріжжя, Запорізька область, 69000',
    'Парковий бульвар, 14, Запоріжжя, Запорізька область, 69000',
    '145V, проспект Соборний, 145В, Запорожье, Запорожская область, 69061',
    'Gleisser 1,, Запоріжжя, Запорізька область, 69000',
  ]),
  lat: faker.latitude(),
  lng: faker.longitude(),
  placeId: null,
}))

Factory.blueprint('App/Models/PlaceRating', (chance, i, data) => ({
  user_id: data.user.id,
  place_id: data.place.id,
  rating: chance.integer({ min: 3, max: 5 }),
}))

Factory.blueprint('App/Models/Place', (faker, i, data) => {
  return {
    admin_id: data.admin.id,
    title: faker.pickone(['Пески', 'Ждановский пляж', 'Карьер', 'На волне', 'Радуга', 'Дирижабль', 'Мост', 'Охота на облака', 'Каписталист', 'Дубовий Гай']),
    address_id: data.address.id,
    description: `
    Очень хорошее место что бы бесплатно отдохнуть на природе. 
    Пожарить шашлыков, весело провести время на майские праздники.
  `,
  }
})
