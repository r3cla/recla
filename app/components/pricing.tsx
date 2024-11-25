import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"

const tiers = [
  {
    name: 'Professional',
    price: 39,
    setupFee: 399,
    features: [
      'Personalised Design & Layout',
      'Advanced SEO Setup & Monitoring',
      'Social Media Integration',
      'Responsive Design',
      'Monthly Security Updates',
      'Regular Performance Monitoring',
      'Email Support',
    ],
  },
  {
    name: 'E-Commerce',
    price: 69,
    setupFee: 599,
    features: [
      'All Professional Website Features',
      'Secure Payment Gateway Setup',
      'Product Management System',
      'Inventory Tracking',
      'Enhanced Security Monitoring',
      'Advanced Performance Optimization',
      '24/7 Technical Support',
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div key={tier.name} className="border border-gray-200 rounded-lg p-8 shadow-sm flex flex-col">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{tier.name}</h3>
              <div className="mb-6">
                <p className="text-4xl font-bold text-gray-900">${tier.price}<span className="text-xl font-normal text-gray-600">/month</span></p>
                <p className="text-gray-600 mt-2">+ ${tier.setupFee} one-off development/setup fee</p>
              </div>
              <ul className="mb-8 space-y-3 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-auto">Choose Plan</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

