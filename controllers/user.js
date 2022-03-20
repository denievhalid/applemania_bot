import User from "../models/user";
import axios from "axios";

export async function getAll() {
  return new Promise(async (resolve, reject) => {
    try {
      return resolve(await User.find({}));
    } catch (e) {
      return reject("Неизвестная ошибка");
    }
  });
}

export async function register(phone, telegramId) {
  return new Promise(async (resolve, reject) => {
    try {
      const candidate = await User.findOne({
        phone,
        telegramId,
        active: false,
      });

      if (candidate) {
        return resolve("🕐 Ваша заявка на рассмотрении");
      }

      await User.create({ phone, telegramId });

      await sendInfo(phone);

      return resolve("✅ Спасибо! Ваша заявка принята! ");
    } catch (e) {
      return reject("Неизвестная ошибка");
    }
  });
}

function sendInfo(phone) {
  return axios.get(
    "https://api.telegram.org/bot5230576672:AAGoxTTsnGq1wdp0oROFJVNVFXI5cm3rey4/sendMessage",
    {
      params: {
        chat_id: 5002496163,
        text: `Добавился новый оптовик:\n${phone}`,
      },
    }
  );
}
