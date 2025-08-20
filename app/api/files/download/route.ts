import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const filePath = searchParams.get("path")

    if (!filePath) {
      return NextResponse.json({ error: "File path is required" }, { status: 400 })
    }

    // Download file from Supabase Storage
    const { data, error } = await supabase.storage.from("documents").download(filePath)

    if (error) {
      console.error("Error downloading file:", error)
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Get file info for proper headers
    const fileName = filePath.split("/").pop() || "download"
    const fileExtension = fileName.split(".").pop()?.toLowerCase()

    // Set appropriate content type
    let contentType = "application/octet-stream"
    if (fileExtension === "pdf") contentType = "application/pdf"
    else if (fileExtension === "doc") contentType = "application/msword"
    else if (fileExtension === "docx")
      contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    else if (fileExtension === "txt") contentType = "text/plain"

    // Return file as response
    return new NextResponse(data, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    })
  } catch (error) {
    console.error("Error in file download:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
