const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

const typeDefs = gql`
    type MenuItem {
        name: String
        description: String
        price: Float
        category: String
    }

    type Query {
        menuItems: [MenuItem]
    }
`;

const resolvers = {
    Query: {
        menuItems: () => [
            // Appetizers
            { name: 'Iceberg Wedge Salad', description: 'with House Cured Bacon, tomato salsa, gorgonzola', price: 7.50, category: 'Appetizers' },
            { name: 'Sautéed Shredded Brussels Sprouts', description: 'bacon, hazelnuts, gorgonzola', price: 6.95, category: 'Appetizers' },
            { name: 'Kale Salad', description: 'parmesan crisp, corn, radish, garlic-lemon vinaigrette', price: 7.50, category: 'Appetizers' },
            { name: 'Pecan Crusted Utah Goat Cheese with Basil-Mint Pesto', description: 'grilled tomato salsa, crostini', price: 6.95, category: 'Appetizers' },
            { name: 'Chicken and Cabbage Eggrolls', description: 'hot & sour dipping sauce', price: 6.95, category: 'Appetizers' },
            // Entrees
            { name: 'Farfalle Pasta with Braised Pork in Tomato Cream', description: 'capers, butternut squash, kale', price: 12.95, category: 'Entrees' },
            { name: 'Stout Braised Bratwurst', description: 'horseradish mashed potatoes, roasted root veggies, grilled onion', price: 13.95, category: 'Entrees' },
            { name: 'Salmon & Crispy Tofu in Yellow Curry Sauce', description: 'vegetable sauté, golden raisin chutney', price: 15.95, category: 'Entrees' },
            { name: 'Sesame Shrimp', description: 'udon noodles, ramen broth, shiitake mushrooms, bean sprouts, scallions', price: 13.95, category: 'Entrees' },
            // Sandwiches - Cold
            { name: 'Turkey & Avocado', description: 'with tomato', price: 7.95, category: 'Cold Sandwiches' },
            { name: 'Pub Club', description: 'turkey, bacon, lettuce, tomato', price: 9.25, category: 'Cold Sandwiches' },
            { name: 'Rare Roast Beef & Swiss', description: 'sweet-hot mustard, lettuce, red onion', price: 9.25, category: 'Cold Sandwiches' },
            { name: 'Veggie', description: 'pepper jack, avocado, sprout, tomato', price: 9.25, category: 'Cold Sandwiches' },
            // Sandwiches - Hot
            { name: 'Southwest Chicken Breast', description: 'grilled onion, poblano pepper, tomato, lettuce, jack cheese', price: 9.50, category: 'Hot Sandwiches' },
            { name: 'Portobello Fresh Mozzarella', description: 'caramelized onion, roasted pepper, tomato, field greens, basil aioli', price: 9.50, category: 'Hot Sandwiches' },
            { name: 'Chipotle BBQ Pork Sandwich', description: 'pickled jalapeño slaw', price: 9.50, category: 'Hot Sandwiches' },
            { name: 'Bacon Burger', description: 'Swiss, lettuce, tomato', price: 9.25, category: 'Hot Sandwiches' },
            { name: 'Mexi Burger', description: 'pepper relish, pepper jack, tomato, lettuce, guacamole', price: 9.25, category: 'Hot Sandwiches' },
            { name: 'Herb Marinated Top Sirloin', description: 'crimini mushrooms, caramelized onion, gorgonzola, basil aioli, served open faced on focaccia', price: 10.95, category: 'Hot Sandwiches' },
            { name: 'Roast Beef with Ancho Au Jus', description: 'jack cheese, grilled onions, served on Crumb Bros. baguette', price: 9.75, category: 'Hot Sandwiches' },
            { name: 'Blackened Catfish', description: 'creole peppers & onions, fresh herb aioli, served on house made sourdough', price: 9.75, category: 'Hot Sandwiches' },
            // Soup & Salad Combos
            { name: 'French Onion or Soup of the Day', description: '', price: 4.95, category: 'Soup & Salad Combos' },
            { name: 'French Onion or Soup of the Day Combo with small green salad, fresh fruit, or house pasta', description: '', price: 7.25, category: 'Soup & Salad Combos' },
            { name: 'French Onion or Soup of the Day Combo with half pasta of the day', description: '', price: 8.75, category: 'Soup & Salad Combos' },
            // Fajitas
            { name: 'Chicken Fajitas', description: 'onions, poblano and bell peppers, guacamole, two salsas', price: 10.95, category: 'Fajitas' },
            { name: 'Sirloin Steak Fajitas', description: 'onions, poblano and bell peppers, carrots, onion, guacamole, two salsas', price: 10.95, category: 'Fajitas' },
            // Tacos
            { name: 'Beer Battered Fish Tacos', description: 'jalapeño remoulade, roasted salsa, cabbage', price: 9.95, category: 'Tacos' },
            { name: 'Carne Asada Tacos', description: 'guacamole, tomatillo salsa', price: 9.95, category: 'Tacos' },
            { name: 'Citrus Marinated Chicken Tacos', description: 'guacamole, tomatillo salsa', price: 9.95, category: 'Tacos' },
            { name: 'Grilled Veggie Tacos', description: 'zucchini, yellow squash, bell peppers, onion, guacamole, tomatillo salsa', price: 9.95, category: 'Tacos' },
            // Enchiladas
            { name: 'Chili Relleno', description: 'stuffed with jack cheese & corn, glazed yam, chayote squash, succotash, red chili sauce', price: 9.95, category: 'Enchiladas' },
            { name: 'Pepita Crusted Salmon with Chipotle Glaze', description: 'chevre whipped yams, jicama slaw, tomatillo sauce', price: 10.95, category: 'Enchiladas' },
            { name: 'Enchiladas - uno', description: 'with Southwestern succotash, black beans with chipotle crema, choice of beef, chicken, cheese or veggie', price: 8.50, category: 'Enchiladas' },
            { name: 'Enchiladas - dos', description: 'with Southwestern succotash, black beans with chipotle crema, choice of beef, chicken, cheese or veggie', price: 9.95, category: 'Enchiladas' },
            { name: 'Enchiladas - tres', description: 'with Southwestern succotash, black beans with chipotle crema, choice of beef, chicken, cheese or veggie', price: 11.50, category: 'Enchiladas' },
            // Quiche
            { name: 'Bacon Swiss Mushroom Zucchini and Mushroom Quiche', description: 'choice of fresh fruit or green salad', price: 8.95, category: 'Quiche' },
            // Green Salads
            { name: 'Grilled Red Trout', description: 'lentils, tomatoes, cukes, green beans, red bells, almonds, sundried tomato vinaigrette', price: 10.95, category: 'Green Salads' },
            { name: 'Smoked Turkey Cheese Tortellini', description: 'bacon, tomato, cucumber, egg, black bean-corn salsa, avocado', price: 9.95, category: 'Green Salads' },
            { name: 'Asian Grilled Chicken', description: 'snow peas, carrot slaw, red bells, water chestnut, peanuts, baby corn, cilantro, cukes, spicy peanut dressing', price: 10.50, category: 'Green Salads' },
            { name: 'Southwest Grilled Chicken', description: 'tomato, guacamole, pepitas, jicama, corn & black bean salsa, orange wedges, spicy citrus vinaigrette', price: 10.50, category: 'Green Salads' },
            { name: 'Mediterranean Italian Sausage', description: 'artichoke hearts, green beans, roma tomato, kalamatas, red onion, cucumber, croutons, parmesan, fresh mozzarella, gorgonzola vinaigrette', price: 9.95, category: 'Green Salads' },
            { name: 'Grilled Salmon', description: 'artichoke tapenade, shredded kale, corn, radish, parmesan crisps', price: 11.50, category: 'Green Salads' }
        ],
    },
};

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}

startServer();
