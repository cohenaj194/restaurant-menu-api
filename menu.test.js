const request = require('supertest');
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

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
            { name: 'Iceberg Wedge Salad', description: 'with House Cured Bacon, tomato salsa, gorgonzola', price: 7.50, category: 'Appetizers' },
            { name: 'Sautéed Shredded Brussels Sprouts', description: 'bacon, hazelnuts, gorgonzola', price: 6.95, category: 'Appetizers' },
            { name: 'Kale Salad', description: 'parmesan crisp, corn, radish, garlic-lemon vinaigrette', price: 7.50, category: 'Appetizers' },
            { name: 'Pecan Crusted Utah Goat Cheese', description: 'Basil-Mint Pesto, grilled tomato salsa, crostini', price: 6.95, category: 'Appetizers' },
            { name: 'Chicken and Cabbage Eggrolls', description: 'hot & sour dipping sauce', price: 6.95, category: 'Appetizers' },
            { name: 'Farfalle Pasta with Braised Pork', description: 'in Tomato Cream, capers, butternut squash, kale', price: 12.95, category: 'Entrees' },
            { name: 'Stout Braised Bratwurst', description: 'horseradish mashed potatoes, roasted root veggies, grilled onion', price: 13.95, category: 'Entrees' },
            { name: 'Salmon & Crispy Tofu', description: 'in Yellow Curry Sauce, vegetable sauté, golden raisin chutney', price: 15.95, category: 'Entrees' },
            { name: 'Sesame Shrimp', description: 'udon noodles, ramen broth, shiitake mushrooms, bean sprouts, scallions', price: 13.95, category: 'Entrees' },
            { name: 'Turkey & Avocado Sandwich', description: 'with tomato', price: 7.95, category: 'Cold Sandwiches' },
            { name: 'Pub Club Sandwich', description: 'turkey, bacon, lettuce, tomato', price: 9.25, category: 'Cold Sandwiches' },
            { name: 'Rare Roast Beef & Swiss Sandwich', description: 'sweet-hot mustard, lettuce, red onion', price: 9.25, category: 'Cold Sandwiches' },
            { name: 'Veggie Sandwich', description: 'pepper jack, avocado, sprout, tomato', price: 9.25, category: 'Cold Sandwiches' },
            { name: 'Southwest Chicken Breast Sandwich', description: 'grilled onion, poblano pepper, tomato, lettuce, jack cheese', price: 9.50, category: 'Hot Sandwiches' },
            { name: 'Portobello Fresh Mozzarella Sandwich', description: 'caramelized onion, roasted pepper, tomato, field greens, basil aioli', price: 9.50, category: 'Hot Sandwiches' },
            { name: 'Chipotle BBQ Pork Sandwich', description: 'pickled jalapeño slaw', price: 9.50, category: 'Hot Sandwiches' },
            { name: 'Bacon Burger', description: 'Swiss, lettuce, tomato', price: 9.25, category: 'Hot Sandwiches' },
            { name: 'Mexi Burger', description: 'pepper relish, pepper jack, tomato, lettuce, guacamole', price: 9.25, category: 'Hot Sandwiches' },
            { name: 'Herb Marinated Top Sirloin', description: 'crimini mushrooms, caramelized onion, gorgonzola, basil aioli, served open faced on focaccia', price: 10.95, category: 'Hot Sandwiches' },
            { name: 'Roast Beef with Ancho Au Jus Sandwich', description: 'jack cheese, grilled onions, served on Crumb Bros. baguette', price: 9.75, category: 'Hot Sandwiches' },
            { name: 'Blackened Catfish Sandwich', description: 'creole peppers & onions, fresh herb aioli, served on house made sourdough', price: 9.75, category: 'Hot Sandwiches' },
            { name: 'French Onion Soup', description: '', price: 4.95, category: 'Soup & Salad Combos' },
            { name: 'Soup of the Day', description: '', price: 4.95, category: 'Soup & Salad Combos' },
            { name: 'Soup & Salad Combo', description: 'French Onion or Soup of the Day with small green salad, fresh fruit, or house pasta', price: 7.25, category: 'Soup & Salad Combos' },
            { name: 'Soup & Salad Combo with Half Pasta', description: 'French Onion or Soup of the Day with half pasta of the day', price: 8.75, category: 'Soup & Salad Combos' },
            { name: 'Chicken Fajitas', description: 'onions, poblano and bell peppers, guacamole, two salsas', price: 10.95, category: 'Fajitas' },
            { name: 'Sirloin Steak Fajitas', description: 'onions, poblano and bell peppers, carrots, onion, guacamole, two salsas', price: 10.95, category: 'Fajitas' },
            { name: 'Beer Battered Fish Tacos', description: 'jalapeño remoulade, roasted salsa, cabbage', price: 9.95, category: 'Tacos' },
            { name: 'Carne Asada Tacos', description: 'guacamole, tomatillo salsa', price: 9.95, category: 'Tacos' },
            { name: 'Citrus Marinated Chicken Tacos', description: 'guacamole, tomatillo salsa', price: 9.95, category: 'Tacos' },
            { name: 'Grilled Veggie Tacos', description: 'zucchini, yellow squash, bell peppers, onion, guacamole, tomatillo salsa', price: 9.95, category: 'Tacos' },
            { name: 'Chili Relleno', description: 'stuffed with jack cheese & corn, glazed yam, chayote squash, succotash, red chili sauce', price: 9.95, category: 'Enchiladas' },
            { name: 'Pepita Crusted Salmon', description: 'with Chipotle Glaze, chevre whipped yams, jicama slaw, tomatillo sauce', price: 10.95, category: 'Enchiladas' },
            { name: 'Enchilada Uno', description: 'with Southwestern succotash, black beans with chipotle crema, choice of beef, chicken, cheese or veggie', price: 8.50, category: 'Enchiladas' },
            { name: 'Enchilada Dos', description: 'with Southwestern succotash, black beans with chipotle crema, choice of beef, chicken, cheese or veggie', price: 9.95, category: 'Enchiladas' },
            { name: 'Enchilada Tres', description: 'with Southwestern succotash, black beans with chipotle crema, choice of beef, chicken, cheese or veggie', price: 11.50, category: 'Enchiladas' },
            { name: 'Bacon Swiss Mushroom Quiche', description: 'zucchini and mushroom quiche, choice of fresh fruit or green salad', price: 8.95, category: 'Quiche' },
            { name: 'Grilled Red Trout Salad', description: 'lentils, tomatoes, cukes, green beans, red bells, almonds, sundried tomato vinaigrette', price: 10.95, category: 'Green Salads' },
            { name: 'Smoked Turkey Tortellini Salad', description: 'cheese tortellini, bacon, tomato, cucumber, egg, black bean-corn salsa, avocado', price: 9.95, category: 'Green Salads' },
            { name: 'Asian Grilled Chicken Salad', description: 'snow peas, carrot slaw, red bells, water chestnut, peanuts, baby corn, cilantro, cukes, spicy peanut dressing', price: 10.50, category: 'Green Salads' },
            { name: 'Southwest Grilled Chicken Salad', description: 'tomato, guacamole, pepitas, jicama, corn & black bean salsa, orange wedges, spicy citrus vinaigrette', price: 10.50, category: 'Green Salads' },
            { name: 'Mediterranean Sausage Salad', description: 'Italian sausage, artichoke hearts, green beans, roma tomato, kalamatas, red onion, cucumber, croutons, parmesan, fresh mozzarella, gorgonzola vinaigrette', price: 9.95, category: 'Green Salads' },
            { name: 'Grilled Salmon Salad', description: 'artichoke tapenade, shredded kale, corn, radish, parmesan crisps', price: 11.50, category: 'Green Salads' }
        ],
    },
};

async function startServer() {
    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });
    return app;
}

let app;

beforeAll(async () => {
    app = await startServer();
});

test('should fetch menu items', async () => {
    const response = await request(app)
        .post('/graphql')
        .send({
            query: '{ menuItems { name description price category } }',
        });
    expect(response.status).toBe(200);
    expect(response.body.data.menuItems.length).toBeGreaterThan(0);
    expect(response.body.data.menuItems[0]).toHaveProperty('name');
    expect(response.body.data.menuItems[0]).toHaveProperty('description');
    expect(response.body.data.menuItems[0]).toHaveProperty('price');
    expect(response.body.data.menuItems[0]).toHaveProperty('category');
});
