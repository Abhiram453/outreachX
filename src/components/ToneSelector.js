"use client";

const toneOptions = [
  {
    id: "professional",
    label: "Professional",
    description: "Formal and business-like",
    icon: "👔",
  },
  {
    id: "friendly",
    label: "Friendly Professional",
    description: "Warm yet professional",
    icon: "🤝",
  },
  {
    id: "enthusiastic",
    label: "Enthusiastic",
    description: "Energetic and passionate",
    icon: "⚡",
  },
  {
    id: "humble",
    label: "Humble & Curious",
    description: "Respectful and eager to learn",
    icon: "🙏",
  },
];

const lengthOptions = [
  { id: "concise", label: "Concise", description: "Under 100 words" },
  { id: "standard", label: "Standard", description: "100-150 words" },
  { id: "detailed", label: "Detailed", description: "150-200 words" },
];

export default function ToneSelector({ formData, setFormData }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
          <svg
            className="w-5 h-5 text-pink-600 dark:text-pink-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Message Style
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Tone
          </label>
          <div className="grid grid-cols-2 gap-2">
            {toneOptions.map((tone) => (
              <button
                key={tone.id}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    tone: tone.id,
                  }))
                }
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  formData.tone === tone.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-500"
                    : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{tone.icon}</span>
                  <div>
                    <p className="font-medium text-sm text-slate-800 dark:text-slate-100">
                      {tone.label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {tone.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Message Length
          </label>
          <div className="flex gap-2">
            {lengthOptions.map((length) => (
              <button
                key={length.id}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    length: length.id,
                  }))
                }
                className={`flex-1 p-3 rounded-lg border-2 transition-all text-center ${
                  formData.length === length.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-500"
                    : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                }`}
              >
                <p className="font-medium text-sm text-slate-800 dark:text-slate-100">
                  {length.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {length.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
