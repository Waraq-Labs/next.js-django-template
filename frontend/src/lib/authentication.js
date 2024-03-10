'use client';

import { useLocalStorage } from "@uidotdev/usehooks";

export function getTokenIfValid(tokenData) {
  if (tokenData !== null) {
    const expiry = new Date(tokenData.expiry);
    if (expiry > new Date()) {
      return tokenData.token;
    }
  }

  return null;
}

export function useAuthTokenData() {
  return useLocalStorage(
      'tokenData',
      null
  );
}