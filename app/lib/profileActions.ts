"use server"

import { createClient } from "./supabase";

export async function getUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser();
  if(error) {
    console.log("Error fetching user:", error.message);
    return { user: null, error: error.message };
  }
  return { user, error: null };
}

export async function updateUserDisplayName(displayName: string, newPassword?: string, existingPassword?: string) {
    const supabase = await createClient();
    const updateData: { data: { display_name: string }, password?: string } = {
        data: {
            display_name: displayName,
        },
    };
    if (newPassword && existingPassword) {
        const {error: signInError} = await supabase.auth.signInWithPassword( {
            email: (await getUser()).user?.email || '',
            password: existingPassword,
        });
        if (signInError) {
            return { error: signInError };
        }
        updateData.password = newPassword;
    }
    const { error } = await supabase.auth.updateUser(updateData);
    if(error) {
        console.log("Error updating user display name:", error.message);
        return { error: error.message };
    } else {
        return { error: null };
    }
}

export async function updateUserPassword(newPassword: string, existingPassword: string) {
    const supabase = await createClient();

    if (newPassword && existingPassword) {
        const {error: signInError} = await supabase.auth.signInWithPassword( {
            email: (await getUser()).user?.email || '',
            password: existingPassword,
        });
        if (signInError) {
            return { error: signInError.message };
        }

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        if (error) {
            console.log("Error updating user password:", error.message);
            return { error: error.message };
        }
        return { error: null };
    }
    return { error: "Both new and existing passwords are required." };
}