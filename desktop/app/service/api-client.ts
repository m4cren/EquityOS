import { supabase } from "@/utils/supabase/client";

const BASE_URL = "http://localhost:3001";
type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]
  | Date;

interface ApiProps<TBody> {
  endpoint: string;
  method: "POST" | "GET" | "UPDATE" | "DELETE" | "PATCH";
  body?: TBody;
}

export async function api<
  TResponse,
  TBody extends Json | undefined = undefined
>({ endpoint, method, body }: ApiProps<TBody>): Promise<TResponse> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(session?.access_token && {
        Authorization: `Bearer ${session.access_token}`,
      }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return (await res.json()) as TResponse;
}
