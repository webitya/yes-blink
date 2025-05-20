import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

// This would be a real Razorpay verification in a production app
// For demo purposes, we're just simulating the verification
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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()

    // Validate request
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // In a real app, this would verify the Razorpay signature
    // For demo purposes, we're just returning success

    // Generate a random booking ID
    const bookingId = Math.random().toString(36).substring(2, 10).toUpperCase()

    return NextResponse.json({
      success: true,
      bookingId,
      message: "Payment verified successfully",
    })
  } catch (error) {
    console.error("Verify payment error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
