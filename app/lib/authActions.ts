"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase";

export async function login(formData: {email: string, password: string}) {
    const supabase = await createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (signInError) {
      return signInError.message;
    } else {
      revalidatePath('/', 'layout')
      redirect('/games')
    }
}

export async function signup(formData: {email: string, password: string, displayName: string}) {
    const supabase = await createClient();
    const {data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          display_name: formData.displayName,
        },
      },
    });

    if (signUpError) {
      return signUpError.message;
    } else {
      if (data.session) {
      revalidatePath('/', 'layout')
      redirect('/games')
    } else {
      setTimeout(() => {
        redirect("/login");
      }, 2000);
    }
    }
}

export async function logout() {
    const supabase = await createClient();
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
        return signOutError.message;
    } else {
        revalidatePath('/', 'layout')
        redirect('/login')
    }
}
