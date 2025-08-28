# NetGauge: Internet Speed Test

NetGauge is a modern, responsive web application designed to measure your internet connection's performance. It provides real-time feedback on your download speed, upload speed, and ping, all presented in a clean and intuitive user interface.

## ✨ Features

- **Comprehensive Speed Test**: Measures download speed, upload speed, and latency (ping).
- **Real-Time Results**: Watch your network performance metrics update live during the test.
- **Clean & Modern UI**: A minimalist and visually appealing design built with Shadcn/UI and Tailwind CSS.
- **Responsive Design**: A seamless experience across desktops, tablets, and mobile devices.
- **IP Address Display**: Quickly see your public IP address.
- **Progressive Web App (PWA)**: Installable on mobile devices for a native app-like experience.

## 🚀 Getting Started

This project is built with Next.js and can be run locally.

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [Shadcn/UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) (for potential future AI features)

## 📁 Project Structure

- `src/app/`: Contains the main application pages and layout.
- `src/components/`: Includes reusable React components, such as `SpeedTest.tsx` and UI elements from Shadcn.
- `src/ai/`: Reserved for Genkit AI flows and configurations.
- `public/`: Stores static assets like icons.
- `tailwind.config.ts`: Configuration file for Tailwind CSS.
- `next.config.ts`: Configuration for the Next.js application.
