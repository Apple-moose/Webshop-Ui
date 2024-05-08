# 💡 Formal Frontend Assessment

(This is a markdown .MD file, if you are reading this in VSCode, right click the file and select `Open Preview`)

### Rules for this challenge

- You are allowed to consult Kyna, previous exercises and search on the internet
- You are not allowed to ask your colleagues for help
- You are not allowed to make this challenge public in any ways
- If you do use a tool like ChatGPT and copy code from it, you must include a `Sources.md` file in your repo that explains why you used ChatGPT, what prompts you used, and what code you copied

### Duration

- This assessment starts at 10:00am on Tuesday and ends at 4:00pm on Wednesday
- You should be able to complete the required features if you only work from 10-4 each day, however you are free to continue working outside of those hours until the offical stop time

### Passing grade

This assessment is graded in red, yellow or green. Meaning of each grade:

- 📕 Red: you have not completed all 6 required features. `Fail grade`.

- 📒 Yellow: you have completed all 6 required features. `Pass grade`.

- 📗 Green: you have completed all required features and at least 3 bonus features. `Pass with honor grade`.

🚨 **If you've completed all required features, but they are not fully functional, you might still downgrade to a red.**

### Results feedback

Correcting these assessments take time. Please be patient with regards to getting the results of your assessments.

### How to make and submit your work
- You will use this GitHub Classroom assignment link for this entire assessment
- When you're finished with your assessment, fill in the feedback.md file in this repo with your feedback
- Once you make a commit to the `main` branch, your assignment will appear as "submitted" to your teachers. You can optionally use other branches if you want and only merge your branch into `main` when you're finished
- The last commit before 4:00pm on Wednesday will be used to assess you
- Feedback from your teachers will appear in a special "Feedback" pull request in your assignment repo. You should get a GitHub notification when new feedback is added

### Learning goals
#### Main learning goals:
JS:
- Array iterators (map, filter, find, reduce)
- Using npm to install packages
- Using interactive HTML elements like buttons, forms, and select dropdowns
- Using event listeners and event handlers, like onClick

React:
- Creating components
- Nesting components and passing them data via props
- Managing component local UI state with useState hook
- Using react-router-dom to make static and dynamic routes

Redux:
- Installing and setting up Redux in a React app
- Creating and managing state using Redux stores
- Writing update logic in reducers and actions
- Creating and using selectors to get information from the store
- Writing and using thunks for asynchronous actions like interacting with APIs

#### Additional learning goals include:
- API authentication with Redux
- CSS styling
- Basic git and GitHub usage: making commits, adding remote & pushing to master

### General Tips

- **Read the features carefully!** It is easy to accidentally deviate from the features, resulting in a frustrating experience. Taking the time to read the requirements can save you time and effort.
- **Don't get stuck for too long!** If you feel stuck, try taking a small walk, continuing on to a next step, or talking out loud about the problem you're facing (programmers call this "rubber-ducking"). Everybody can get stuck, but don't let it stop you.
- **Focus on the required features first!** Before moving to the bonus features of this assessment, focus on implementing the required parts, then move on to the next ones.

# What are we building?
The goal of this assessment is to build a shopping app. It has a few main pages, where users should be able to browser products, add them to their cart, and view their carts. See the Features list and API details below for all the details

### Wireframes
You can use the following design wireframes as an inspiration:
- <a href="https://p-928eb7.f4.n0.cdn.getcloudapp.com/items/eDu6bGEd/webshop_project.png?v=771138ac1a5cbaf3cb2eb6b3ae90c425">Design 1</a>
- Don't worry about the looks of your app, we will not take it into account when grading you!

### Tip- Spend an hour planning:
  - The structure of the Redux store and initial state
  - How many slices? 
  - What actions will you need?
  - What selectors will you need?
  - What thunks will you need?
  - What pages and components will you need? 

# Features
- Required features are marked with ❗️
- Product data must come from the API
- You must use Redux for global state management

> Hint: There are many, many ways you can implement the below features. For one possible solution, it might help to review [this example](https://github.com/TechmongersNL/fs03-react/blob/react-lifting-state/src/components/character-list.js#L10-L24) from our React Harry Potter app. We took some data from an API, added our own "likes" data on top of it, and then stored that all in our state 😉

## Product features 🍎
### ❗🍎 Feature 1 - Product list page
- As a customer, I want to see an overview of the products available
- The data must come from the API and must be stored with Redux

### ❗🍎 Feature 2 - Product details page
- As a customer, I want to see more information about a product on a product-specific page
- The data must come from the API and must be stored with Redux

### 🍎 Feature 3 - Product list page filtering and sorting
- As a customer, I want to sort items on the product list page by price
- As a customer, I want to filter items on the product list page by category

## Cart interaction features ℹ️
### ❗ℹ️ Feature 4 - Add to cart
- As a customer, I want to add products to my cart from the product list page
- As a customer, I want to add a product to my cart from the product detail page
- The cart state data must be stored in Redux

### ❗ℹ️ Feature 5 - Go to cart with X items
- As a customer, I want to navigate to the cart page from every page
- As a customer, I want to see the total items in my cart from every page

### ℹ️ Feature 6 - Cart details on products
- As a customer, I want to see whether (and if so, how many times) I’ve added a product to my cart, on the product list page
- As a customer, I want to see whether (and if so, how many times) I’ve added the to my cart, on the product detail page

## Cart page features 🛒
### ❗🛒 Feature 7 - Cart page
- As a customer, I want to view my cart on a separate page, which includes an overview of which products are in it and how many of each
- As a customer, I want to see the total price for all the items in my cart

### ❗🛒 Feature 8 - Checkout products
- As a customer, I want to purchase all the products in my cart with one button click

> Note: you can just console.log all product info currently in the cart to simulate the checkout flow

### 🛒 Feature 9 - Adjust items in cart
- As a customer, I want to adjust the number of products currently in my cart (add or remove quantity)
- As a customer, I want to be able to empty my whole cart with one button click

## Saving the state features 💾
### 💾 Feature 10 - Saving state 
- As a customer, I want my cart info to be saved even when I refresh the page
- Every time the cart is updated, save the cart data from the Redux store into browser local storage. See the Kyna Redux Auth module for information on how to do this
- Every time the app reloads/the page refreshes, get the cart data from browser local storage and save it back into your Redux store

## Login features 🔐
### 🔐 Feature 11 - Signup page
- As a customer, I want to sign up to create an account

### 🔐 Feature 12 - Login
- As a signed up customer, I want to log in to my account
- As a logged in customer, I want to see a personalized greeting with my name at the top of every page

### 🔐 Feature 13 - Profile page
- As a logged in customer, I want to see my own profile information on a profile page

### 🔐 Feature 14 - Stay logged in
- As a logged in customer, I want to refresh and still be logged in

# API
## Setup
You will be running this backend API locally on your own computers. You will be running two things locally for this assessment: the frontend on `localhost:3000` like normal, and the backend on `localhost:4000`
- You can find the backend API here: [https://tm-redux-webshop-backend.onrender.com/](https://tm-redux-webshop-backend.onrender.com/)
- `Git clone <ssh link>` the repo above
- `cd` into the repo, then run `npm install`
- In a new terminal, run `npm start`. This will start the local backend server
- To access the API, use `http://localhost:4000` as the base URL for all your requests. For example, to get a list of products, you would use `http://localhost:4000/products`

## Endpoints
### GET /products
  - Does not require auth
  - Returns an array of Product objects
  - Each Product object looks like this: 
  ```json
    {
      "categoryId": 7,
      "createdAt": "2021-12-21T12:42:14.120Z",
      "description": "Catan, previously known as The Settlers of Catan or simply Settlers, is a multiplayer board game designed by Klaus Teuber.",
      "id": 1,
      "imageUrl": "https://cdn.webshopapp.com/shops/203114/files/310850791/kolonisten-van-catan-basisspel-10.jpg",
      "name": "Catan",
      "price": 30,
      "updatedAt": "2021-12-21T12:42:14.120Z"
    }
  ```
### GET /products/:id
  - Does not require auth
  - Returns one Product object, that matches the id parameter

### GET /products/category
  - Does not require auth
  - Returns an array of Category objects
  - Each Category object looks like this:
  ```js
  {
        "id": 7,
        "name": "Games",
        "createdAt": "2021-12-21T12:42:14.082Z",
        "updatedAt": "2021-12-21T12:42:14.082Z",
        "products": [/* Array of Product objects*/]
  }
  ```
  
### POST /auth/signup
  - Accepts an object in the request body like this: 
  ```json 
  {
    "email": "tessa@techmongers.nl",
    "password": "123",
    "firstName": "Tessa"
  }
  ```
  - It also optionally accepts lastName and imageUrl keys
  - If the user does not already exist and the request is formatted correctly, it will return a info about the user and token like this:
  ```js
  {
    "token": /* JWT token string */
    /* ... and other user info */
  }
  ```

### POST /auth/login
  - Accepts an object in the request body like this: 
  ```json 
  {
    "email": "tessa@techmongers.nl",
    "password": "123"
  }
  ```
  - If the user has signed up an the password matches, it will return an object like this with a JWT token
  ```js
  {
    "token": /* JWT token string */
    /* ... and other user info */
  }
  ```

### GET /auth/me
  - Requires an Authorization header with a valid JWT token from a logged in user
 
  - Returns information about the user like this:
  ```js
  {
    "token": /* JWT token string */,
    "id": 6,
    "firstName": "tessa",
    "lastName": null,
    "email": "tessa@techmongers.nl",
    "imageUrl": null,
    "createdAt": "2023-12-11T13:51:51.660Z",
    "updatedAt": "2023-12-11T13:51:51.660Z"
  } 
  ```
  >  Note: See the example code at the bottom of [this site](https://redux-assessment-api.vercel.app/) on how to add an Authorization header with Axios
