import User from "../models/user";

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

      await fetch(
        "https://api.telegram.org/bot5126338980:AAHWd2229p63w1PiX5yu94TBR3dFAEGVRWg/sendMessage?chat_id=1142646378&text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82!"
      );

      return resolve("✅ Спасибо! Ваша заявка принята! ");
    } catch (e) {
      return reject("Неизвестная ошибка");
    }
  });
}
