"use client";

import { useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { SetupWizard } from "@/components/provider/setup-wizard";
import { BasicInfoStep } from "@/components/provider/basic-info-step";
import { SkillsStep } from "@/components/provider/skills-step";
import { LocationStep } from "@/components/provider/location-step";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Create context for form data
const SetupContext = createContext<any>(null);

export function useSetupContext() {
  const context = useContext(SetupContext);
  if (!context) {
    throw new Error("useSetupContext must be used within SetupProvider");
  }
  return context;
}

export default function ProviderSetupPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    basicInfo: {},
    skills: [],
    location: {},
  });

  const updateFormData = (step: string, data: any) => {
    setFormData((prev) => ({ ...prev, [step]: data }));
  };

  const steps = [
    {
      id: "basic-info",
      title: "Basic Info",
      description: "Tell us about your business and experience",
      component: <BasicInfoStep />,
    },
    {
      id: "skills",
      title: "Skills",
      description: "Select the skills and services you offer",
      component: <SkillsStep />,
    },
    {
      id: "location",
      title: "Location",
      description: "Set your service area and availability",
      component: <LocationStep />,
    },
  ];

  const handleComplete = async () => {
    setIsSubmitting(true);

    try {
      // Save provider profile
      const profileResponse = await fetch("/api/provider/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData.basicInfo,
          ...formData.location,
        }),
      });

      if (!profileResponse.ok) {
        throw new Error("Failed to create profile");
      }

      // Save skills if any selected
      if (formData.skills && formData.skills.length > 0) {
        const skillsResponse = await fetch("/api/provider/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skills: formData.skills }),
        });

        if (!skillsResponse.ok) {
          console.error("Failed to save skills");
        }
      }

      router.push("/dashboard?setup=complete");
    } catch (error) {
      console.error("Setup error:", error);
      alert("Failed to complete setup. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SetupContext.Provider value={{ formData, updateFormData, isSubmitting }}>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Provider Setup</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Let's Get You Started as a Provider
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete your profile in just 3 easy steps and start earning on Tether
            </p>
          </div>

          {/* Wizard */}
          <SetupWizard steps={steps} onComplete={handleComplete} isSubmitting={isSubmitting} />
        </div>
      </div>
    </SetupContext.Provider>
  );
}
