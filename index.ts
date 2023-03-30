const prompts = require('prompts');

type Product = {
  title: string;
  price: number;
};

const products: Product[] = [
  {
    title: 'Coffee (L)',
    price: 190,
  },
  {
    title: 'Coffee (XL)',
    price: 280,
  },
  {
    title: 'Hot Chocolate',
    price: 180,
  },
  {
    title: 'Tea',
    price: 145,
  },
];
const coins: number[] = [200, 100, 50, 20, 10, 5, 2, 1];
(async () => {
  const response = await prompts({
    type: 'select',
    name: 'product',
    message: 'Please select your product: ',
    choices: products,
    initial: 0,
  });
  const selectedProduct: Product = products[response.product];

  let wallet: number = 0;

  while (wallet < selectedProduct.price) {
    await prompts({
      type: 'number',
      name: 'value',
      message: 'Insert a coin: ',
      validate: (value: number) =>
        coins.includes(value)
          ? (wallet += value)
          : console.log(' Please enter a valid coin.'),
    });
  }

  let remainder: number = wallet - selectedProduct.price;

  console.log('REMAINDER: ' + remainder);

  coins.forEach((coin) => {
    if (remainder === 0) {
      return;
    }
    const times = Math.floor(remainder / coin);
    if (times) {
      console.log(coin + ' / ' + times);
      remainder -= coin * times;

      console.log('Remainder is: ' + remainder);
    }
  });
})();
