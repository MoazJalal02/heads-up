import { NextResponse } from "next/server"
 
export default function Get(){
  return NextResponse.json({
    hello: "world",
  })
}