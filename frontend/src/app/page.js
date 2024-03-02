"use client";

import { BACKEND_URL } from "@/constants";

async function signIn() {
  const loginData = new FormData();
  loginData.append("username", "admin");
  loginData.append("password", "admin");

  return await fetch(`${BACKEND_URL}/accounts/login/`, {
    method: "POST",
    body: loginData,
    credentials: "include",
  });
}

async function whoAmI() {
  console.log(
    await fetch(`${BACKEND_URL}/accounts/me/`, {
      method: "GET",
      credentials: "include",
    }),
  );
}

export default function Home() {
  return (
    <main className="flex min-h-dvh w-full flex-col justify-around">
      <h1 className="text-center">Home</h1>
      <button className="" onClick={signIn}>
        Sign In
      </button>
      <button onClick={whoAmI}>Who Am I</button>
    </main>
  );
}
