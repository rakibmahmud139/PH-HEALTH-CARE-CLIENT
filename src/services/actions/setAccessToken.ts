"use server";

import { cookies } from "next/headers";
import { authKey } from "@/constant/authKey";
import { redirect } from "next/navigation";

export const setAccessToken = (token: string, option?: any) => {
  cookies().set(authKey, token);
  if (option && option.redirect) {
    redirect(option.redirect);
  }
};
