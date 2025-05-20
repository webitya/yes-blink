import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

// This would be a real Razorpay integration in a production app
// For demo purposes, we're just simulating the API response
export async function POST(request) {
  try {
    // Get token from cookies
    const token = cookies().get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get request body
    const { amount, currency, receipt, notes } = await request.json()

    // Validate request
    if (!amount || !currency) {
      return NextResponse.json({ message: "Amount and currency are required" }, { status: 400 })
    }

    // In a real app, this would be a call to Razorpay API to create an order
    // For demo purposes, we're just returning a mock order ID
    const orderId = `order_${Math.random().toString(36).substring(2, 15)}`

    return NextResponse.json({
      id: orderId,
      entity: "order",
      amount,
      amount_paid: 0,
      amount_due: amount,
      currency,
      receipt,
      status: "created",
      attempts: 0,
      notes,
      created_at: Date.now(),
    })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
