"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Star, Award, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock skills data - will be replaced with database query
const skillCategories = [
  {
    category: "Home Services",
    skills: [
      { id: "1", name: "Plumbing", icon: "🔧" },
      { id: "2", name: "Electrical", icon: "⚡" },
      { id: "3", name: "Carpentry", icon: "🔨" },
      { id: "4", name: "Painting", icon: "🎨" },
      { id: "5", name: "Cleaning", icon: "🧹" },
      { id: "6", name: "HVAC", icon: "❄️" },
    ],
  },
  {
    category: "Professional Services",
    skills: [
      { id: "7", name: "Web Development", icon: "💻" },
      { id: "8", name: "Graphic Design", icon: "🎨" },
      { id: "9", name: "Content Writing", icon: "✍️" },
      { id: "10", name: "Photography", icon: "📸" },
      { id: "11", name: "Video Editing", icon: "🎬" },
      { id: "12", name: "Marketing", icon: "📢" },
    ],
  },
  {
    category: "Personal Services",
    skills: [
      { id: "13", name: "Personal Training", icon: "💪" },
      { id: "14", name: "Tutoring", icon: "📚" },
      { id: "15", name: "Life Coaching", icon: "🎯" },
      { id: "16", name: "Yoga Instruction", icon: "🧘" },
      { id: "17", name: "Pet Care", icon: "🐕" },
      { id: "18", name: "Massage Therapy", icon: "💆" },
    ],
  },
];

export function SkillsStep() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<Array<{
    id: string;
    name: string;
    icon: string;
    proficiency: string;
  }>>([]);

  const allSkills = skillCategories.flatMap((cat) => cat.skills);
  const filteredSkills = searchQuery
    ? allSkills.filter((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allSkills;

  const handleSkillToggle = (skill: { id: string; name: string; icon: string }) => {
    const isSelected = selectedSkills.some((s) => s.id === skill.id);
    if (isSelected) {
      setSelectedSkills(selectedSkills.filter((s) => s.id !== skill.id));
    } else {
      setSelectedSkills([...selectedSkills, { ...skill, proficiency: "intermediate" }]);
    }
  };

  const handleProficiencyChange = (skillId: string, proficiency: string) => {
    setSelectedSkills(
      selectedSkills.map((s) =>
        s.id === skillId ? { ...s, proficiency } : s
      )
    );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Award className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Select your skills and expertise</h3>
            <p className="text-sm text-muted-foreground">
              Choose at least 1 skill. You can add more later or create custom skills.
            </p>
          </div>
        </div>
      </Card>

      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Your Selected Skills ({selectedSkills.length})</h3>
          </div>
          <div className="space-y-3">
            {selectedSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <div>
                    <p className="font-medium">{skill.name}</p>
                    <div className="flex gap-2 mt-1">
                      {["beginner", "intermediate", "expert", "master"].map((level) => (
                        <button
                          key={level}
                          onClick={() => handleProficiencyChange(skill.id, level)}
                          className={cn(
                            "text-xs px-2 py-1 rounded transition-colors",
                            skill.proficiency === level
                              ? "bg-primary text-primary-foreground"
                              : "bg-background hover:bg-muted"
                          )}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleSkillToggle(skill)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="skillSearch">Search Skills</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="skillSearch"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for skills..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Skill Categories */}
      {!searchQuery ? (
        <div className="space-y-6">
          {skillCategories.map((category) => (
            <div key={category.category}>
              <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                {category.category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {category.skills.map((skill) => {
                  const isSelected = selectedSkills.some((s) => s.id === skill.id);
                  return (
                    <button
                      key={skill.id}
                      onClick={() => handleSkillToggle(skill)}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all text-left",
                        isSelected
                          ? "border-primary bg-primary/10 shadow-md scale-105"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      {isSelected && (
                        <Badge variant="default" className="mt-2">
                          Selected
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkills.some((s) => s.id === skill.id);
            return (
              <button
                key={skill.id}
                onClick={() => handleSkillToggle(skill)}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all text-left",
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-medium">{skill.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
