"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { MapPin, Navigation, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LocationStep() {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    serviceRadius: "25",
    serviceType: "offline",
  });

  const radiusOptions = [
    { value: "10", label: "10 km", description: "Local neighborhood" },
    { value: "25", label: "25 km", description: "City-wide" },
    { value: "50", label: "50 km", description: "Regional" },
    { value: "100", label: "100 km", description: "Multi-city" },
    { value: "unlimited", label: "Unlimited", description: "Remote work" },
  ];

  const serviceTypes = [
    {
      value: "offline",
      label: "In-Person Only",
      icon: MapPin,
      description: "I provide services at customer locations",
    },
    {
      value: "online",
      label: "Remote Only",
      icon: Globe,
      description: "I provide services online/remotely",
    },
    {
      value: "both",
      label: "Both",
      icon: Navigation,
      description: "I can work in-person or remotely",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Set your service area</h3>
            <p className="text-sm text-muted-foreground">
              Help customers find you by specifying where you provide services.
            </p>
          </div>
        </div>
      </Card>

      {/* Service Type */}
      <div className="space-y-3">
        <Label>How do you provide services?</Label>
        <div className="grid gap-3">
          {serviceTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = formData.serviceType === type.value;
            return (
              <button
                key={type.value}
                onClick={() =>
                  setFormData({ ...formData, serviceType: type.value })
                }
                className={cn(
                  "p-4 rounded-lg border-2 transition-all text-left",
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      isSelected ? "bg-primary/20" : "bg-muted"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        isSelected ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{type.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {formData.serviceType !== "online" && (
        <>
          {/* Address */}
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="San Francisco"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="California"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="94102"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Service Radius */}
          <div className="space-y-3">
            <Label>How far will you travel?</Label>
            <div className="grid gap-3">
              {radiusOptions.map((option) => {
                const isSelected = formData.serviceRadius === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() =>
                      setFormData({ ...formData, serviceRadius: option.value })
                    }
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div>
                      <p className="font-semibold">{option.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border-2 transition-all",
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      )}
                    >
                      {isSelected && (
                        <div className="w-full h-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {formData.serviceType === "online" && (
        <Card className="p-6 bg-muted/50">
          <p className="text-center text-muted-foreground">
            ✨ Great! You'll be able to work with customers worldwide.
          </p>
        </Card>
      )}

      {/* Preview */}
      {formData.city && formData.state && (
        <Card className="p-6 bg-muted/50">
          <p className="text-xs font-semibold text-muted-foreground mb-3">
            PREVIEW - Your service area
          </p>
          <div className="space-y-2">
            <p className="font-medium">
              📍 {formData.city}, {formData.state}
            </p>
            {formData.serviceRadius !== "unlimited" && (
              <p className="text-sm text-muted-foreground">
                Serving customers within {formData.serviceRadius} km
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
