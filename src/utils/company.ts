import type { CompanySettings } from "../types/company";

const COMPANY_SETTINGS_KEY = "company:settings";

export function saveCompanySettings(settings: CompanySettings): void {
  try {
    // Don't store logo in localStorage to avoid quota issues
    const { logo, ...settingsWithoutLogo } = settings;
    localStorage.setItem(COMPANY_SETTINGS_KEY, JSON.stringify(settingsWithoutLogo));
  } catch (error) {
    console.error("Failed to save company settings:", error);
    throw new Error("Failed to save company settings");
  }
}

export function loadCompanySettings(): CompanySettings | null {
  try {
    const raw = localStorage.getItem(COMPANY_SETTINGS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Failed to load company settings:", error);
    return null;
  }
}

export function getCompanySettingsOrDefaults(): CompanySettings {
  return (
    loadCompanySettings() || {
      name: "Your Company Name",
      email: "info@company.com",
      phone: "(555) 123-4567",
      address: "123 Business Street",
      city: "City",
      state: "ST",
      zipCode: "12345",
    }
  );
}
