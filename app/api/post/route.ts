/*
 * @Author: VBlazing
 * @Date: 2025-11-19 11:06:17
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-19 16:13:33
 * @Description: post update
 */
import { NextResponse } from "next/server"
import { AddPost } from "@/server/data"

export async function POST(request: Request) {
  const req = await request.json()
  try {
    await AddPost(req.data)
    return NextResponse.json({ code: 200, data: null })
  } catch (e) {
    return NextResponse.json({ code: 4100, error: e })
  }
}
