import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase";
import { deleteUser } from "@/app/lib/profileActions";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Create Supabase Admin client with service role key to manage users and delete records
    const supabaseClient = await createClient();

    // Delete all games associated with the user
    const { error: gamesError } = await supabaseClient
      .from("games")
      .delete()
      .eq("userId", id);

    if (gamesError) {
      console.error("Error deleting user games:", gamesError);
      return NextResponse.json({ error: "Failed to delete games" }, { status: 500 });
    }

    // Delete user from Supabase auth
    const authError = await deleteUser(id);

    if (authError) {
      console.error("Error deleting user:", authError);
      return NextResponse.json(authError, { status: 500 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
