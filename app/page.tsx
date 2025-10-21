"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, Users, Shield, Zap, Globe, TrendingUp } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Search,
      title: "Smart Matching",
      description: "AI-powered algorithm matches you with the perfect provider in seconds",
    },
    {
      icon: Users,
      title: "Verified Providers",
      description: "Multi-level verification ensures trust and safety for every transaction",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Escrow-protected payments with instant payouts and fraud protection",
    },
    {
      icon: Zap,
      title: "Instant Connect",
      description: "Real-time messaging, video calls, and collaboration tools",
    },
    {
      icon: Globe,
      title: "Global & Local",
      description: "From your neighborhood to anywhere in the world",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Tools to help providers scale and seekers find the best talent",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-24 lg:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                Connect Every Skill
                <br />
                <span className="text-primary">With Every Need</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto"
            >
              The universal marketplace where people with skills meet people with needs.
              Anywhere, anytime.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="text-lg px-8 py-6">
                Find Services
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Offer Your Skills
              </Button>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>10K+ Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>50K+ Services</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span>100+ Cities</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Tether?</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to connect, collaborate, and succeed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <feature.icon className="w-12 h-12 text-primary mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of providers and seekers already using Tether
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Sign Up Now
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold">Tether</div>
            <p className="text-muted-foreground text-sm">
              © 2025 Tether. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
