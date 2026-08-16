import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getProduct } from '@/lib/products'

export async function POST(request: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const { productId, email } = await request.json()
    const product = getProduct(productId)
    if (!product || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid product and email.' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email,
      line_items: [{ price_data: { currency: 'usd', product_data: { name: product.name, description: product.description }, recurring: { interval: 'month' }, unit_amount: product.priceInCents }, quantity: 1 }],
      success_url: `${request.headers.get('origin')}/?checkout=success`,
      cancel_url: `${request.headers.get('origin')}/?checkout=cancelled`,
    })
    return NextResponse.json({ url: session.url })
  } catch {
    return NextResponse.json({ error: 'Unable to open secure checkout right now.' }, { status: 500 })
  }
}
