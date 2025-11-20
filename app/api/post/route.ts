/*
 * @Author: VBlazing
 * @Date: 2025-11-19 11:06:17
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-20 14:06:24
 * @Description: post update
 */
import { NextResponse } from "next/server"
import { AddPost } from "@/server/data"

export async function POST(request: Request) {
  const req = await request.json()
  try {
    await AddPost(req.data)
    return NextResponse.json({ code: 200, data: null })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return NextResponse.json({ code: 4100, error: e.message })
  }
}
