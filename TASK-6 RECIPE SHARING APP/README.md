
#### Login page

![login](https://user-images.githubusercontent.com/73459064/226227457-8e5f0202-6fac-4d30-8ecc-e8caf1348001.jpg)

#### All recipes page

![all-recipes](https://user-images.githubusercontent.com/73459064/226227295-5fe1fb70-c899-4539-9ceb-3bb651187bf2.jpg)

#### Recipe details page

![recipe-details](https://user-images.githubusercontent.com/73459064/226227327-a67a4e65-f0bd-4693-8e2e-5ba597182ab4.jpg)
## Getting Started

If you want to run it on your local machine, please follow the steps below. 

### Prerequisites

-   [Node.js](https://nodejs.org/en/) v14 or higher installed on your machine

### Installation

1.  Clone the repository

	`git clone https://github.com/HarryYu02/Recipe-App.git` 

2.  Install frontend dependencies

	`cd client`  
	`npm install` 

3.  Install backend dependencies

	`cd ../server`  
	`npm install` 

4.  Set up environment variables
	-   Create a `.env` file in the backend directory with the following variables:

		`MONGODB_URI=<your-mongodb-uri>`  
		`CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>`  
		`CLOUDINARY_API_KEY=<your-cloudinary-api-key>`  
		`CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>`   
		`PORT=8080<or-port-of-your-choice>`

	-   Create a `.env.local` file in the frontend directory with the following variables:

		`REACT_APP_GOOGLE_CLIENT_ID=<your-google-client-id>`

	-   If you are not sure how to get these API keys by yourself, you can refer to this [youtube video](https://youtu.be/k4lHXIzCEkM?si=FKRVJ9OysXzi5rQb) from JSMastery, where I get my inspiration for Let'em Cook, on how to setup the project locally, it includes the detail steps on how to setup MongoDB, Cloudinary, and Google OAuth with Refine, and store those API keys into the client folder's .env.local, and server's .env file. Specifically, you will want to check out the [Setup](https://youtu.be/k4lHXIzCEkM?si=Zlv5LN3rKSISGzQQ&t=339), and the [Backend Setup](https://youtu.be/k4lHXIzCEkM?si=Zlv5LN3rKSISGzQQ&t=6520) chapters.  

5.  Change the base url in /client/src/App.tsx
    -  Search and modify all instances of https://letem-cook-backend.onrender.com to your localhost, for example, http://localhost:8080

6.  Start the backend server

	`cd server`  
	`npm run start` 

7.  Start the frontend server

	`cd ../client`  
	`npm run dev` 

8.  Open [http://localhost:3000](http://localhost:3000/) in your browser to see the app

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

-   Email: [harryyu02@gmail.com](mailto:harryyu02@gmail.com)
-   GitHub: [https://github.com/HarryYu02](https://github.com/HarryYu02)
