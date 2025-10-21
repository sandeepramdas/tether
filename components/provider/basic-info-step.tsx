"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { User, Briefcase, FileText, DollarSign } from "lucide-react";

export function BasicInfoStep() {
  const [formData, setFormData] = useState({
    businessName: "",
    tagline: "",
    description: "",
    yearsOfExperience: "",
    hourlyRate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Let's set up your professional profile</h3>
            <p className="text-sm text-muted-foreground">
              This information will help customers understand your expertise and services.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        {/* Business Name */}
        <div className="space-y-2">
          <Label htmlFor="businessName" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            Business Name or Your Name
          </Label>
          <Input
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="e.g., John's Plumbing Services"
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">
            This is how customers will identify you
          </p>
        </div>

        {/* Tagline */}
        <div className="space-y-2">
          <Label htmlFor="tagline" className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Professional Tagline
          </Label>
          <Input
            id="tagline"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            placeholder="e.g., Expert Plumber with 15+ Years Experience"
            maxLength={100}
          />
          <p className="text-xs text-muted-foreground">
            {formData.tagline.length}/100 characters - Make it catchy!
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">About Your Services</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell customers about your experience, specialties, and what makes you unique..."
            rows={5}
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground">
            {formData.description.length}/500 characters
          </p>
        </div>

        {/* Experience and Rate */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="yearsOfExperience">Years of Experience</Label>
            <Input
              id="yearsOfExperience"
              name="yearsOfExperience"
              type="number"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              placeholder="e.g., 15"
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hourlyRate" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              Starting Hourly Rate (USD)
            </Label>
            <Input
              id="hourlyRate"
              name="hourlyRate"
              type="number"
              value={formData.hourlyRate}
              onChange={handleChange}
              placeholder="e.g., 75"
              min="0"
            />
            <p className="text-xs text-muted-foreground">
              You can adjust this per service
            </p>
          </div>
        </div>
      </div>

      {/* Preview Card */}
      {formData.businessName && (
        <Card className="p-6 bg-muted/50">
          <p className="text-xs font-semibold text-muted-foreground mb-3">
            PREVIEW - How customers will see you
          </p>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">{formData.businessName}</h3>
            {formData.tagline && (
              <p className="text-sm text-muted-foreground italic">
                "{formData.tagline}"
              </p>
            )}
            {formData.yearsOfExperience && (
              <p className="text-sm">
                <span className="font-semibold">
                  {formData.yearsOfExperience}+ years
                </span>{" "}
                of experience
              </p>
            )}
            {formData.hourlyRate && (
              <p className="text-lg font-bold text-primary">
                ${formData.hourlyRate}/hour
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
