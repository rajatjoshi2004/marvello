import Razorpay from 'razorpay';
import { serve } from 'https://deno.fresh.run/std@v9.6.1/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const razorpay = new Razorpay({
      key_id: Deno.env.get('RAZORPAY_KEY_ID') || '',
      key_secret: Deno.env.get('RAZORPAY_KEY_SECRET') || '',
    });

    const order = await razorpay.orders.create({
      amount: 99900, // amount in smallest currency unit (paise)
      currency: 'INR',
    });

    return new Response(
      JSON.stringify({ 
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: Deno.env.get('RAZORPAY_KEY_ID')
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create order' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});