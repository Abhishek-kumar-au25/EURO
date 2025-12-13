# Firebase Studio - Drive Admin

This is a Next.js application built with Firebase Studio for managing a ride-sharing service.

## Running the Project in VS Code

Here’s a step-by-step guide to get this project running on your local machine using Visual Studio Code.

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18 or later is recommended)
- [npm](https://www.npmjs.com/) (which comes with Node.js)
- [Visual Studio Code](https://code.visualstudio.com/)

### Step 1: Get the Code

First, ensure you have the project code on your local machine. You can download it from your Firebase Studio session.

### Step 2: Open the Project in VS Code

Open Visual Studio Code, and then open the project folder you just downloaded.

```bash
# Navigate to your project directory
cd your-project-folder

# Open it in VS Code
code .
```

### Step 3: Install Dependencies (Crucial Step!)

This is the most important step to resolve the error you're seeing. Open the integrated terminal in VS Code (`Ctrl+` or `Cmd+`\`). Then, install all the project dependencies by running the following command:

```bash
npm install
```

This command downloads all the necessary packages (like Next.js) and creates a `node_modules` folder. Without this, commands like `next` will not be recognized.

### Step 4: Set Up Environment Variables

The project uses environment variables for configuration. You'll need to create a local environment file.

1.  Create a new file in the root of your project named `.env.local`.
2.  Copy the contents of the existing `.env` file into your new `.env.local` file.
3.  Add any required environment variables. For example, if you plan to use the AI features with Genkit and Google's Gemini models, you'll need to add your API key:

    ```
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

### Step 5: Run the Development Server

Now you're ready to start the application. Use the following command in the VS Code terminal to run the Next.js development server:

```bash
npm run dev
```

This will start the app with Turbopack for faster development. Once it's running, you'll see a message like this in your terminal:

```
▲ Next.js 15.5.9 (Turbopack)
- Local:        http://localhost:9002
```

You can now open your web browser and navigate to **http://localhost:9002** to see your application live! Any changes you make to the code will automatically reload the page.

### Additional Scripts

- **Type Checking**: To check for any TypeScript errors without building the project, run:
  ```bash
  npm run typecheck
  ```
- **Building for Production**: To create an optimized build of your application for deployment, run:
  ```bash
  npm run build
  ```
- **Starting the Production Server**: To run the production build locally, use:
  ```bash
  npm run start
  ```
