// src/utils/priceCalculations.js

export const PRICE_BRACKETS = [
  { min: 1, price: 47 },    // 47.00 per unit
  { min: 5, price: 94 },    // 18.80 per unit
  { min: 10, price: 141 },  // 14.10 per unit
  { min: 25, price: 234 },  // 9.36 per unit
  { min: 50, price: 328 },  // 6.56 per unit
  { min: 100, price: 422 }, // 4.22 per unit
  { min: 250, price: 820 }, // 3.28 per unit
  { min: 500, price: 1172 },// 2.34 per unit
  { min: 1000, price: 1641 },// 1.64 per unit
  { min: 2000, price: 2906 },// 1.45 per unit
  { min: 3000, price: 3656 },// 1.22 per unit
  { min: 5000, price: 5156 },// 1.03 per unit
  { min: 10000, price: 8438 },// 0.84 per unit
  { min: 30000, price: 14063 }// 0.47 per unit
];

export const calculatePrice = (quantity) => {
  if (quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

  // Find the appropriate price bracket
  let bracket = PRICE_BRACKETS[0]; // Default to first bracket
  
  for (let i = 0; i < PRICE_BRACKETS.length; i++) {
    if (quantity >= PRICE_BRACKETS[i].min) {
      bracket = PRICE_BRACKETS[i];
    } else {
      break;
    }
  }

  // Calculate unit price based on the bracket
  const unitPrice = bracket.price / bracket.min;
  const totalPrice = unitPrice * quantity;

  return {
    totalPrice: Math.round(totalPrice * 100) / 100,
    unitPrice: Math.round(unitPrice * 100) / 100
  };
};
