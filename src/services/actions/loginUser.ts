"use server";

import { FormValues } from "@/app/login/page";

export const loginUser = async (data: FormValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const userInfo = await res.json();

  return userInfo;
};
