"use client";

import * as React from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LANGUAGE_KEY = "claimflow.settings.language";
const THEME_KEY = "claimflow.theme";

type Language = "fr" | "en" | "nl";
type Theme = "light" | "dark";

const LANGUAGE_LABELS: Record<Language, string> = {
  fr: "Français",
  en: "English",
  nl: "Nederlands",
};

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

/**
 * Language selector (decorative — the interface itself stays in English) and a theme
 * selector that toggles the `.dark` class already defined in app/globals.css. The toggle
 * only runs while this page (or a client-side navigation from it) is mounted, since we
 * can't add a root-layout bootstrap script from this page's scope — see project report.
 */
function readStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    return (window.localStorage.getItem(LANGUAGE_KEY) as Language | null) ?? "en";
  } catch {
    return "en";
  }
}

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    return (window.localStorage.getItem(THEME_KEY) as Theme | null) ?? "light";
  } catch {
    return "light";
  }
}

export function PreferencesSection() {
  const [language, setLanguage] = React.useState<Language>(readStoredLanguage);
  const [theme, setTheme] = React.useState<Theme>(readStoredTheme);

  // Synchronizes the `.dark` class on <html> with the theme state — not a setState call,
  // so it's the right kind of work to do in an effect (mirrors external DOM state to React).
  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function handleLanguageChange(value: string) {
    const next = value as Language;
    setLanguage(next);
    try {
      window.localStorage.setItem(LANGUAGE_KEY, next);
    } catch {
      // ignore
    }
    toast.success(`Language set to ${LANGUAGE_LABELS[next]}`, {
      description: "Decorative for this demo — the interface itself stays in English.",
    });
  }

  function handleThemeChange(value: string) {
    const next = value as Theme;
    setTheme(next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      // ignore
    }
    toast.success(`Theme set to ${next === "dark" ? "Dark" : "Light"}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Display preferences for your ClaimFlow account.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="language-select">Language</Label>
          <Select value={language} onValueChange={(value) => handleLanguageChange(value as string)}>
            <SelectTrigger id="language-select" className="w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="nl">Nederlands</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Decorative for this demo — the interface itself does not change language.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="theme-select">Theme</Label>
          <Select value={theme} onValueChange={(value) => handleThemeChange(value as string)}>
            <SelectTrigger id="theme-select" className="w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Applies while you navigate the app in this session.</p>
        </div>
      </CardContent>
    </Card>
  );
}
