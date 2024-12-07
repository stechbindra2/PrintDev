import React from 'react';
import { Users, Printer, HeadphonesIcon, ArrowRight, ChevronRight } from 'lucide-react';

const benefits = [
  {
    icon: <Users className="w-12 h-12 text-primary" />,
    title: "Attract new customers",
    description: "Reach thousands of people looking for printing services in your area"
  },
  {
    icon: <Printer className="w-12 h-12 text-primary" />,
    title: "Doorstep delivery convenience",
    description: "Handle your orders efficiently through our streamlined delivery platform"
  },
  {
    icon: <HeadphonesIcon className="w-12 h-12 text-primary" />,
    title: "24/7 support",
    description: "Get dedicated support for any issues or special requirements"
  }
];

const faqs = [
  {
    question: "What are the documents and details required to list my printing shop on PrintDev?",
    answer: "You'll need to provide your shop's registration documents, GST certificate, valid ID proof, and bank account details for payments."
  },
  {
    question: "How long will it take for my shop to go live after submitting the documents?",
    answer: "Once all documents are verified, your shop can go live within 24-48 hours."
  },
  {
    question: "What is the revenue sharing split?",
    answer: "We have a competitive revenue sharing model that ensures fair earnings for our partners. Details will be shared during onboarding."
  },
  {
    question: "How can I get help if I face any issues?",
    answer: "Our dedicated partner support team is available 24/7 through phone, email, and chat."
  }
];

export function Partner() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-6">
              Partner with PrintDev<br />
              <span className="text-primary">and grow your business</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Join the largest network of print shops and reach thousands of new customers
            </p>
            <div className="mt-8">
              <button className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors md:py-4 md:text-lg md:px-10">
                Register your shop
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why partner with PrintDev?</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Get Started in 3 simple steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Register your shop", desc: "Fill basic details about your printing business" },
              { step: "2", title: "Complete verification", desc: "Submit required documents for verification" },
              { step: "3", title: "Start receiving orders", desc: "Go live and start serving customers" }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-primary font-bold text-xl mb-2">Step {item.step}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Ready to grow your printing business?</h2>
          <button className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors md:py-4 md:text-lg md:px-10">
            Join PrintDev today
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}