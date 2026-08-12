import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { OrderExperience } from '@/components/order/OrderExperience';
import { barImages } from '@/data/images';

export const metadata: Metadata = {
  title: 'Order Online',
  description:
    'Order from Bamboo Village for delivery or pickup. Build your order, add your details, and send it straight to us on WhatsApp.',
  alternates: { canonical: '/order' },
  openGraph: {
    title: 'Order Online | Bamboo Village',
    description: 'Delivery or pickup, confirmed on WhatsApp in a few taps.',
    url: '/order',
  },
};

const STEPS = [
  {
    title: 'Build your order',
    body: 'Browse the full menu, adjust quantities, and watch the total update as you go.',
  },
  {
    title: 'Add your details',
    body: 'Name, phone, and whether you want it delivered or you are collecting.',
  },
  {
    title: 'Send it on WhatsApp',
    body: 'We generate the message for you. Confirm the total with us and we get started.',
  },
];

export default function OrderPage() {
  return (
    <>
      <PageHeader
        eyebrow="Order online"
        title="Hungry now?"
        accent="Say no more."
        description="Delivery across the city or collection from the village. Build your order here and send it to us on WhatsApp — no accounts, no apps, no waiting on hold."
        image={barImages.wide.src}
        imageAlt={barImages.wide.alt}
        focal={barImages.wide.focal}
      />

      {/* How it works */}
      <section className="section-tight border-b border-gold/12 bg-charcoal">
        <div className="shell">
          <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span className="font-display text-4xl leading-none text-gold/45 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block font-display text-xl text-cream">
                    {step.title}
                  </span>
                  <span className="mt-2.5 block max-w-[34ch] text-sm leading-relaxed text-cream/55">
                    {step.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <OrderExperience />
    </>
  );
}
