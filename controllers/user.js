import User from "../models/user";
import axios from "axios";

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

      await axios({
        url: `https://api.telegram.org/bot5126338980:AAHWd2229p63w1PiX5yu94TBR3dFAEGVRWg/sendMessage?chat_id=5002496163&text=Добавился новый оптовик:\n${phone}&parse_mode=html`,
      });

      return resolve("✅ Спасибо! Ваша заявка принята! ");
    } catch (e) {
      return reject("Неизвестная ошибка");
    }
  });
}
