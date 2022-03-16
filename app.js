import mongo from "./mongo";
import bot from "./bot";
import { register } from "./controllers/user";
import { isAdmin } from "./functions";

mongo().then(() => {
  let addPost = false;

  bot.onText(/\/start/, ({ chat: { id }, from }) => {
    const keyboard = [];
    keyboard.push([
      { text: "⬆ Отправить номер телефона", request_contact: true },
    ]);

    //if (isAdmin(id)) {
    keyboard.push([{ text: "Написать пост" }]);
    //}

    bot.sendMessage(
      id,
      "📞 Отправьте, пожалуйста, Ваш номер телефона для добавления в базу оптовиков",
      {
        reply_markup: {
          resize_keyboard: true,
          keyboard,
        },
      }
    );
  });

  bot.onText(/^Написать пост/, (msg) => {
    const {
      chat: { id },
      from,
    } = msg;

    addPost = true;

    bot.sendMessage(id, "Введите пост");
  });

  bot.on("message", ({ chat: { id, message }, contact, from }) => {
    if (addPost) {
      addPost = false;
      bot.sendMessage(id, "thanks");
      return;
    }

    if (contact) {
      register(contact.phone_number, id).then((e) => {
        bot.sendMessage(id, e);
      });
    }
  });
});
