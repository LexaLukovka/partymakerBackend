// noinspection HtmlUnknownAttribute,HtmlDeprecatedTag

const uniqId = require('uniqid')

module.exports = [
  {
    text: 'А можно написать так?',
    token: `temp-${uniqId()}`,
    user_id: 2,
    room_id: 2,
  },
  {
    text: 'Что?',
    token: `temp-${uniqId()}`,
    user_id: 4,
    room_id: 2,
  },
  {
    text: '<Frame styles="{{...}}/">',
    token: `temp-${uniqId()}`,
    user_id: 2,
    room_id: 2,
  },
  {
    text: 'Или classNe?',
    token: `temp-${uniqId()}`,
    user_id: 2,
    room_id: 2,
  },
  {
    text: 'Чё?)',
    token: `temp-${uniqId()}`,
    user_id: 4,
    room_id: 2,
  },
  {
    text: 'Ну к примеру проверки делать',
    token: `temp-${uniqId()}`,
    user_id: 2,
    room_id: 2,
  },
  {
    text: 'Нет - другие',
    token: `temp-${uniqId()}`,
    user_id: 2,
    room_id: 2,
  },
  {
    text: 'Ну как в обычном у нас?',
    token: `temp-${uniqId()}`,
    user_id: 4,
    room_id: 2,
  },
]
