// src/app/page.tsx
import React from "react";

// Example import from your component folder
import MyComponent from "../Paige/Tsx/MyComponent";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to Fiilthy Studio
      </h1>

      <p className="text-lg text-gray-700 mb-4 text-center">
        This is your main landing page. Start building your app here!
      </p>

      {/* Example component */}
      <MyComponent />

      <footer className="mt-10 text-gray-500">
        &copy; 2026 Fiilthy Studio
      </footer>
    </main>
  );
}
