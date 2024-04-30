import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'sibusiso',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'sibusiso',
      email: 'sbu@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
     // fruits ,
    {
      // _id: '1',
      name: 'Apples',
      slug: 'apples',
      category: 'fruits',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '5',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Bananas',
      slug: 'bananas',
      category: 'fruits',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '5',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Oranges',
      slug: 'oranges',
      category: 'fruits',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '5',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Grapes',
      slug: 'grapes',
      category: 'fruits',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '10',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Mangoes',
      slug: 'mangoes',
      category: 'fruits',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '10',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Pineapples',
      slug: 'pineapples',
      category: 'fruits',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '10',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Peaches',
      slug: 'peaches',
      category: 'fruits',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '10',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Avocados',
      slug: 'avocados',
      category: 'fruits',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '5',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Papayas ',
      slug: 'papayas ',
      category: 'fruits',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '0.9',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Watermelons',
      slug: 'watermelons',
      category: 'fruits',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '0.9',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },

     // vegitables ,
     {
      // _id: '1',
      name: 'Tomatoes',
      slug: 'tomatoes',
      category: 'vegitables',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '0.9',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Potatoes',
      slug: 'potatoes',
      category: 'vegitables',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '5',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Onions',
      slug: 'onions',
      category: 'vegitables',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '5',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Carrots',
      slug: 'carrots',
      category: 'vegitables',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '5',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Cabbage',
      slug: 'cabbage',
      category: 'vegitables',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '5',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Spinach',
      slug: 'spinach',
      category: 'vegitables',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '5',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Sweet Potatoes',
      slug: 'sweet-potatoes',
      category: 'vegitables',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '5',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Butternut Squash',
      slug: 'butternut-squash',
      category: 'vegitables',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '10',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Green Beans',
      slug: 'green-beans',
      category: 'vegitables',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '10',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
    {
      // _id: '1',
      name: 'Green Peppers ',
      slug: 'green-peppers ',
      category: 'vegitables',
      image: "imglink",
      price: 120,
      countInStock: 10,
      size: '10',
      rating: 4.5,
      numReviews: 10,
      description: "Introducing our succulent oranges, nature's perfect blend of tangy sweetness and refreshing zest. Bursting with juicy flavor and vibrant color, each handpicked orange promises a delightful sensory experience. Whether enjoyed as a snack, juiced for a refreshing beverage, or incorporated into culinary creations, our premium oranges elevate any occasion with their unparalleled freshness and natural goodness. Taste the sunshine with every bite of our premium oranges.",
    },
  
  ],
};
export default data;