import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: [
        'Food',
        'Transport',
        'Shopping',
        'Bills',
        'Entertainment',
        'Train',
        'Hotel',
        'Stationary',
        'Medical',
        'Education',
        'Travel',
        'Groceries',
        'Other'
      ],
      default: 'Other'
    }
  },
  { timestamps: true }
);

export const Expense = mongoose.model('Expense', expenseSchema);
