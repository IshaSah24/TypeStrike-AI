import { Check, Zap, Crown, Sparkles } from "lucide-react";

const PricingPlans = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for casual typing practice",
      icon: Sparkles,
      features: [
        "Basic typing tests",
        "Single player mode",
        "Limited text selections",
        "Basic statistics",
        "Up to 5 tests per day",
      ],
      limitations: ["No AI opponents", "No multiplayer", "No custom themes"],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$1.50",
      period: "per month",
      description: "Unlock AI competition & advanced features",
      icon: Zap,
      features: [
        "Everything in Free",
        "Unlimited typing tests",
        "AI opponent (3 difficulty levels)",
        "Multiplayer lobbies",
        "Advanced statistics & analytics",
        "Custom themes & fonts",
        "Progress tracking",
        "Leaderboard access",
      ],
      limitations: [],
      buttonText: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Champion",
      price: "$2.55",
      period: "per month",
      description: "For serious typists & competitors",
      icon: Crown,
      features: [
        "Everything in Pro",
        "Advanced AI with adaptive difficulty",
        "Private multiplayer rooms",
        "Tournament access",
        "Detailed performance insights",
        "Custom word lists",
        "Priority matchmaking",
        "Ad-free experience",
        "Early access to new features",
        "Champion badge & profile customization",
      ],
      limitations: [],
      buttonText: "Go Champion",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl  font-light text-white mb-4 tracking-tight">
            Choose Your Plan
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Elevate your typing skills with AI-powered competition and
            multiplayer battles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`relative rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? "border-emerald-500 bg-[#141414] shadow-2xl shadow-emerald-500/10"
                    : "border-[#2a2a2a] bg-[#141414] hover:border-[#3a3a3a]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`p-3 rounded-xl ${
                        plan.popular ? "bg-emerald-500/10" : "bg-gray-800"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          plan.popular ? "text-emerald-500" : "text-gray-400"
                        }`}
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-400 ml-2">
                        / {plan.period}
                      </span>
                    </div>
                  </div>

                  <button
                    className={`w-full py-3.5 px-6 rounded-xl font-semibold transition-all duration-200 mb-8 ${
                      plan.popular
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/30"
                        : "bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
                    }`}
                  >
                    {plan.buttonText}
                  </button>

                  <div className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <div className="w-3 h-0.5 bg-gray-600"></div>
                        </div>
                        <span className="text-gray-500 text-sm leading-relaxed">
                          {limitation}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            All plans include 24/7 support and regular updates
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
