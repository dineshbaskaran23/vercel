'use client'

import { useState } from 'react'
import { ArrowRight, Check, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react'

const product = { name: 'Flux One', eyebrow: 'The daily operating system', description: 'A focused workspace for teams that move fast. Plan, align, and ship from one calm command center.', price: 129, features: ['Unlimited workspaces', 'AI-assisted workflows', 'Priority support'] }

export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setIsSubmitting(true); setMessage('')
    try {
      const response = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId: 'flux-one', email }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to start checkout')
      window.location.href = data.url
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Something went wrong'); setIsSubmitting(false) }
  }

  return <main className="min-h-dvh overflow-hidden bg-background text-foreground"><div className="mx-auto flex min-h-dvh w-full max-w-[1440px] flex-col px-6 py-5 lg:px-12">
    <header className="flex items-center justify-between border-b border-border pb-5"><a href="#top" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"><span className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground"><Sparkles className="size-3.5" /></span>flux / one</a><div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"><span className="hidden sm:inline">Product 01</span><span className="size-1 rounded-full bg-primary" /> Secure checkout</div></header>
    <section id="top" className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-10"><div className="flex flex-col justify-center"><p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-primary">{product.eyebrow}</p><h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-[clamp(4rem,7vw,7rem)] lg:leading-[0.92]">Work at the speed of <span className="text-primary">now.</span></h1><p className="mt-7 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">{product.description}</p><div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"><span className="flex items-center gap-2"><Check className="size-4 text-primary" /> 14-day free trial</span><span className="flex items-center gap-2"><Check className="size-4 text-primary" /> Cancel anytime</span></div></div>
    <div className="rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-black/20 sm:p-7"><div className="flex items-start justify-between border-b border-border pb-5"><div><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Product detail</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">{product.name}</h2></div><p className="font-mono text-2xl font-semibold">${product.price}<span className="text-sm text-muted-foreground">/mo</span></p></div><div className="grid gap-3 py-5 text-sm text-muted-foreground">{product.features.map((feature) => <div key={feature} className="flex items-center gap-3"><span className="grid size-5 place-items-center rounded-full bg-primary/15 text-primary"><Check className="size-3" /></span>{feature}</div>)}</div><form onSubmit={handleSubmit} className="border-t border-border pt-5"><label htmlFor="email" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Work email</label><input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />{message && <p role="alert" className="mt-2 text-xs text-destructive">{message}</p>}<button disabled={isSubmitting} className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? 'Opening secure checkout…' : 'Buy now'} {!isSubmitting && <ArrowRight className="size-4" />}</button><div className="mt-4 flex items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"><span className="flex items-center gap-1.5"><LockKeyhole className="size-3" /> SSL secured</span><span className="flex items-center gap-1.5"><ShieldCheck className="size-3" /> Stripe protected</span></div></form></div></section>
    <footer className="flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"><span>Flux Labs © 2026</span><span>Built for momentum</span></footer>
  </div></main>
}
