import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: false, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
  },
  { timestamps: true },
);

// 1.Додайте до схеми userSchema метод toJSON, щоб видаляти пароль
//  із об'єкта користувача перед відправкою у відповідь.

// 2.Створіть хук pre('save'), щоб за замовчуванням встановлювати
// username таким самим, як email, при створенні користувача.

export const User = mongoose.model('User', userSchema);
