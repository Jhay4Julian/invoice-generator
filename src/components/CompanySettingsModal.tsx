import { X, Building2, Upload } from "lucide-react";
import type { CompanySettings } from "../types/company";
import { useState } from "react";
import { saveCompanySettings } from "../utils/company";

interface Props {
  settings: CompanySettings;
  onSave: (settings: CompanySettings) => void;
  onClose: () => void;
}

export default function CompanySettingsModal({ settings, onSave, onClose }: Props) {
  const [formData, setFormData] = useState<CompanySettings>(settings);
  const [error, setError] = useState("");

  const handleLogoUpload = (file: File) => {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      setError("Failed to read file. Please try again.");
    };
    reader.onloadend = () => {
      if (reader.result) {
        setFormData(prev => ({
          ...prev,
          logo: reader.result as string,
        }));
        setError(""); // Clear any previous errors
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    try {
      if (!formData.name.trim()) {
        setError("Company name is required");
        return;
      }
      saveCompanySettings(formData);
      onSave(formData);
    } catch (err) {
      setError("Failed to save company settings");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-xl shadow-2xl w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto sm:w-full flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-3 sm:p-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Company Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 cursor-pointer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 mx-3 sm:m-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Content */}
        <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 flex-1 overflow-y-auto">
          {/* Logo Upload */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Building2 className="w-4 h-4" />
              Company Logo
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <label className="flex-1 w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all">
                <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" />
                <span className="text-xs sm:text-sm text-gray-600">
                  {formData.logo ? "Change logo" : "Upload your logo"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleLogoUpload(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
              </label>
              {formData.logo && (
                <div className="w-16 h-16 sm:w-24 sm:h-24 border border-gray-200 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={formData.logo}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Basic Information</h3>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, name: e.target.value }))
                }
                placeholder="Your Company Name"
                className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="info@company.com"
                  className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone || ""}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="(555) 123-4567"
                  className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website || ""}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, website: e.target.value }))
                }
                placeholder="https://www.company.com"
                className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Address Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Address</h3>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={formData.address || ""}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, address: e.target.value }))
                }
                placeholder="123 Business Street"
                className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city || ""}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, city: e.target.value }))
                  }
                  placeholder="City"
                  className="w-full px-2 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state || ""}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, state: e.target.value }))
                  }
                  placeholder="ST"
                  className="w-full px-2 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={formData.zipCode || ""}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, zipCode: e.target.value }))
                  }
                  placeholder="12345"
                  className="w-full px-2 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Tax Info */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              Tax ID
            </label>
            <input
              type="text"
              value={formData.taxId || ""}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, taxId: e.target.value }))
              }
              placeholder="e.g., EIN or VAT number"
              className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3 sm:p-6 flex gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-semibold cursor-pointer text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg cursor-pointer text-sm sm:text-base"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
