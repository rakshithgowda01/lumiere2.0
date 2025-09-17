"use client"
import React from "react"
import { cn } from "@/lib/utils"

const App = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const faqs = [
    {
      question: "How to use this component?",
      answer:
        "To use this component, import it and render in your JSX. You can place it inside any section and it will expand/collapse smoothly.",
    },
    {
      question: "Are there any other components available?",
      answer:
        "Yes, browse the Components section of the library for more building blocks.",
    },
    {
      question: "Are components responsive?",
      answer: "Yes, all components are responsive and work across screen sizes.",
    },
    {
      question: "Can I customize the components?",
      answer:
        "Absolutely. Pass props, override classes, or compose with your own layout.",
    },
    {
      question: "Do you support dark mode?",
      answer:
        "The styles are Tailwind-based and inherit your theme tokens, so dark mode works out of the box.",
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        .faq-poppins * { font-family: 'Poppins', sans-serif; }
      `}</style>
      <div className="faq-poppins max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-center gap-8 px-4 md:px-0">
        <img
          className="max-w-sm w-full rounded-xl h-auto"
          src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
          alt="FAQ Illustration"
        />
        <div>
          <p className="text-indigo-600 text-sm font-medium">FAQ's</p>
          <h1 className="text-3xl font-semibold text-white">Frequently Asked Questions</h1>
          <p className="text-sm text-slate-400 mt-2 pb-4">
            Ship Beautiful Frontends Without the Overhead — Customizable, Scalable and Developer-Friendly UI Components.
          </p>
          {faqs.map((faq, index) => (
            <div
              className="border-b border-slate-800 py-4 cursor-pointer"
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-white">{faq.question}</h3>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}
                >
                  <path
                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    stroke="#94A3B8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                className={`text-sm text-slate-400 transition-all duration-500 ease-in-out max-w-md ${
                  openIndex === index
                    ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                    : "opacity-0 max-h-0 -translate-y-2"
                }`}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App


