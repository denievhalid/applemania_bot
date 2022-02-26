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

      return resolve("✅ Спасибо! Ваша заявка принята! ");
    } catch (e) {
      return reject("Неизвестная ошибка");
    }
  });
}
