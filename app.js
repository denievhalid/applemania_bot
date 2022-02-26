import mongo from "./mongo";
import bot from "./bot";
import { register } from "./controllers/user";

mongo().then(() => {
  bot.onText(/\/start/, ({ chat: { id }, from }) => {
    bot.sendMessage(
      id,
      "📞 Отправьте, пожалуйста, Ваш номер телефона для добавления в базу оптовиков",
      {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [
            [{ text: "⬆ Отправить номер телефона", request_contact: true }],
          ],
        },
      }
    );
  });

  bot.on("message", ({ chat: { id }, contact, from }) => {
    if (contact) {
      register(contact.phone_number, id).then((e) => {
        bot.sendMessage(id, e);
      });
    }
  });
});
