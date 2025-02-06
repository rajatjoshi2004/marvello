
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Razorpay from "npm:razorpay"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { amount, currency = "INR", receipt } = await req.json()
    console.log("Creating Razorpay order with amount:", amount)

    // Validate amount
    if (!amount || amount <= 0) {
      throw new Error("Invalid amount. Amount must be greater than 0")
    }

    const key_id = Deno.env.get('RAZORPAY_KEY_ID')
    const key_secret = Deno.env.get('RAZORPAY_KEY_SECRET')

    if (!key_id || !key_secret) {
      throw new Error("Razorpay keys are not configured")
    }

    // Initialize Razorpay with proper authentication
    const razorpay = new Razorpay({
      key_id,
      key_secret,
    })

    // Create order with proper parameters
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to smallest currency unit (paise)
      currency,
      receipt,
      notes: {
        source: "Marvello Business Registration"
      }
    })

    // Add the key_id to the response so frontend can use it
    const response = {
      ...order,
      key_id,
    }

    console.log("Order created successfully:", response)

    return new Response(
      JSON.stringify(response),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error("Error creating order:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
