## Paykaro

This is a description of the project.

<img src="imgs/assets/demo-ss-home.png" alt="Logo" width="200" height="200">

## Installation

Follow these steps to set up and run the project locally:

### 1. Clone the repository

```sh
git clone https://github.com/Mahesh7979/Paykaro.git
cd Paykaro
```

### 2. Install server dependencies
```sh
cd server
npm install
```

### 3. Install client dependencies
```sh
cd client
npm install
```

### 4. Server Configuration
Create a .env file in the server directory and add your MongoDB URI and any other necessary environment variables:
```sh
MONGO_URI=your-mongodb-uri
PORT=5000
JWT_SECRET=your-jwt-secret
```


### 5. Start the Server and Client

```sh
cd server
npm start
```
```sh
cd ../client
npm run dev

