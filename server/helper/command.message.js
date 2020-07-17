const { Telegraf } = require('telegraf');
const Calendar = require('telegraf-calendar-telegram');
const axios = require('axios');

let requirement = {};

let response;

const levelList = [
  'beginner',
  'pre_intermediate',
  'intermediate',
  'upper_intermediate',
  'advanced',
];

const beginner = [
  'pre_intermediate',
  'intermediate',
  'upper_intermediate',
  'advanced',
];
const pre_intermediate = [
  'beginner',
  'intermediate',
  'upper_intermediate',
  'advanced',
];
const intermediate = [
  'pre_intermediate',
  'beginner',
  'upper_intermediate',
  'advanced',
];
const upper_intermediate = [
  'pre_intermediate',
  'intermediate',
  'beginner',
  'advanced',
];
const advanced = [
  'pre_intermediate',
  'intermediate',
  'upper_intermediate',
  'beginner',
];

const bot = new Telegraf(process.env.BOT_TOKEN);
const calendar = new Calendar(bot);
const today = new Date();
const minDate = new Date();
const maxDate = new Date();
maxDate.setMonth(today.getMonth());
maxDate.setDate(today.getDate() + 21);

function listReply(message) {
  let query;
  if (message.data) {
    query = message.data;
  } else {
    query = message.text.toLowerCase();
  }
  switch (query) {
    case '/start':
      return {
        chat_id: message.chat.id,
        text: `Welcome, ${message.from.first_name} 👏!
              Could you assume, which your english level is?`,
        reply_markup: JSON.stringify({
          keyboard: [
            ['beginner', 'pre_intermediate'],
            ['intermediate', 'upper_intermediate'],
            ['advanced'],
          ],
          one_time_keyboard: true,
        }),
      };
    case 'beginner':
      Object.keys(requirement).forEach((each) => {
        if (beginner.includes(each)) {
          delete requirement[each];
        }
      });
      requirement.first_name = message.from.first_name;
      requirement.last_name = message.from.last_name;
      requirement.beginner = true;
      return {
        chat_id: message.chat.id,
        text: `👍 Cool. Please, type your email address.`,
      };
    case 'pre_intermediate':
      Object.keys(requirement).forEach((each) => {
        if (pre_intermediate.includes(each)) {
          delete requirement[each];
        }
      });
      requirement.first_name = message.from.first_name;
      requirement.last_name = message.from.last_name;
      requirement.pre_intermediate = true;
      return {
        chat_id: message.chat.id,
        text: `👍 Cool. Please, type your email address.`,
      };
    case 'intermediate':
      Object.keys(requirement).forEach((each) => {
        if (intermediate.includes(each)) {
          delete requirement[each];
        }
      });
      requirement.first_name = message.from.first_name;
      requirement.last_name = message.from.last_name;
      requirement.intermediate = true;
      return {
        chat_id: message.chat.id,
        text: `👍 Cool. Please, type your email address.`,
      };
    case 'upper_intermediate':
      Object.keys(requirement).forEach((each) => {
        if (upper_intermediate.includes(each)) {
          delete requirement[each];
        }
      });
      requirement.first_name = message.from.first_name;
      requirement.last_name = message.from.last_name;
      requirement.upper_intermediate = true;
      return {
        chat_id: message.chat.id,
        text: `👍 Cool. Please, type your email address.`,
      };
    case 'advanced':
      Object.keys(requirement).map((each) => {
        if (advanced.includes(each)) {
          delete requirement[each];
        }
      });
      requirement.first_name = message.from.first_name;
      requirement.last_name = message.from.last_name;
      requirement.advanced = true;
      return {
        chat_id: message.chat.id,
        text: `👍 Cool. Please, type your email address.`,
      };
    case 'yes':
      const levelResolve = Object.keys(requirement)
        .filter((each) => levelList.includes(each))
        .join();
      const data = {
        first_name: requirement.first_name,
        last_name: requirement.last_name,
        level: levelResolve,
        email: requirement.email,
        date: requirement.date,
        time: requirement.time,
      };
      axios
        .post(
          'https://oe-telegram-bot-back-end.herokuapp.com/follower_create',
          data
        )
        .then(() => console.log('request for create Follower was sent!'))
        .catch((err) => console.log(err));
      return {
        chat_id: message.chat.id,
        text: `🤠 Thank\'s. Now we must find your master!
                \nAll required info is in our pocket, isn't it?
                \nEnjoy your free ⏰ until we contact with you! 🤓`,
      };
    case 'no':
      return {
        chat_id: message.chat.id,
        text: `😅 Ok. Again? Type /start`,
      };
    case query:
      if (query.match(/@/g)) {
        requirement.email = message.text;
        minDate.setMonth(today.getMonth());
        minDate.setDate(today.getDate());
        return {
          chat_id: message.chat.id,
          parse_mode: 'Markdown',
          text: `👏 Ok. Now, please, choose convenient date for you.`,
          ...calendar.setMinDate(minDate).setMaxDate(maxDate).getCalendar(),
        };
      }
      if (query.match(/calendar-telegram-date/g)) {
        requirement.date = query.slice(23);
        return {
          chat_id: message.message.chat.id,
          parse_mode: 'Markdown',
          text: `🕰 And last but not least. Please, choose convenient time for you.`,
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [
                {
                  text: '09:30',
                  callback_data: 'arrangement-time-09:30',
                },
                {
                  text: '11:30',
                  callback_data: 'arrangement-time-11:30',
                },
                {
                  text: '13:30',
                  callback_data: 'arrangement-time-13:30',
                },
              ],
              [
                {
                  text: '15:30',
                  callback_data: 'arrangement-time-15:30',
                },
                {
                  text: '17:30',
                  callback_data: 'arrangement-time-17:30',
                },
                {
                  text: '19:30',
                  callback_data: 'arrangement-time-19:30',
                },
              ],
            ],
          }),
        };
      }
      if (query.match(/arrangement-time/g)) {
        requirement.time = query.slice(17);
        response = Object.entries(requirement).map(
          (each) => `${each[0]}: ${each[1] == true ? 'yes' : each[1]}`
        );
        return {
          chat_id: message.message.chat.id,
          parse_mode: 'Markdown',
          text: `👌 Nice. Now we have this info. Is it correct?:
                \n*${response.join(`\n`)}*`,
          reply_markup: JSON.stringify({
            keyboard: [['YES', 'NO']],
            one_time_keyboard: true,
          }),
        };
      }
      if (query.match(/calendar-telegram-next/g)) {
        minDate.setMonth(today.getMonth() + 1);
        minDate.setDate(today.getDate() - today.getDate() + 1);
        return {
          chat_id: message.message.chat.id,
          parse_mode: 'Markdown',
          text: `💫 Ok. It's a next one`,
          ...calendar.setMinDate(minDate).setMaxDate(maxDate).getCalendar(),
        };
      }
      return {
        chat_id: (message.chat && message.chat.id) || message.message.chat.id,
        text: "😔 Sorry, I don't understand this message!",
      };
    default:
      return {
        chat_id: (message.chat && message.chat.id) || message.message.chat.id,
        text: "😔 Sorry, I don't understand this message!",
      };
  }
}

module.exports = {
  listReply,
};
