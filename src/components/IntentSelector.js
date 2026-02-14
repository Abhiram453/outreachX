"use client";

const intents = [
  {
    id: "mentorship",
    label: "Mentorship",
    description: "Seeking guidance and career advice",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: "purple",
  },
  {
    id: "internship",
    label: "Internship Inquiry",
    description: "Exploring internship opportunities",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "blue",
  },
  {
    id: "informational",
    label: "Informational Interview",
    description: "Learning about their career path",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    color: "green",
  },
  {
    id: "referral",
    label: "Job Referral",
    description: "Requesting a job referral",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "orange",
  },
  {
    id: "networking",
    label: "General Networking",
    description: "Building professional connections",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    color: "cyan",
  },
  {
    id: "advice",
    label: "Industry Advice",
    description: "Getting specific industry insights",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "yellow",
  },
];

const colorClasses = {
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/30",
    border: "border-purple-200 dark:border-purple-700",
    selected: "ring-2 ring-purple-500 border-purple-500",
    icon: "text-purple-600 dark:text-purple-400",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/30",
    border: "border-blue-200 dark:border-blue-700",
    selected: "ring-2 ring-blue-500 border-blue-500",
    icon: "text-blue-600 dark:text-blue-400",
  },
  green: {
    bg: "bg-emerald-50 dark:bg-emerald-900/30",
    border: "border-emerald-200 dark:border-emerald-700",
    selected: "ring-2 ring-emerald-500 border-emerald-500",
    icon: "text-emerald-600 dark:text-emerald-400",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-900/30",
    border: "border-orange-200 dark:border-orange-700",
    selected: "ring-2 ring-orange-500 border-orange-500",
    icon: "text-orange-600 dark:text-orange-400",
  },
  cyan: {
    bg: "bg-cyan-50 dark:bg-cyan-900/30",
    border: "border-cyan-200 dark:border-cyan-700",
    selected: "ring-2 ring-cyan-500 border-cyan-500",
    icon: "text-cyan-600 dark:text-cyan-400",
  },
  yellow: {
    bg: "bg-amber-50 dark:bg-amber-900/30",
    border: "border-amber-200 dark:border-amber-700",
    selected: "ring-2 ring-amber-500 border-amber-500",
    icon: "text-amber-600 dark:text-amber-400",
  },
};

export default function IntentSelector({ formData, setFormData }) {
  const handleIntentSelect = (intentId) => {
    setFormData((prev) => ({
      ...prev,
      intent: intentId,
    }));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
          <svg
            className="w-5 h-5 text-amber-600 dark:text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Outreach Intent
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {intents.map((intent) => {
          const colors = colorClasses[intent.color];
          const isSelected = formData.intent === intent.id;

          return (
            <button
              key={intent.id}
              type="button"
              onClick={() => handleIntentSelect(intent.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                colors.bg
              } ${isSelected ? colors.selected : colors.border} hover:scale-[1.02]`}
            >
              <div className={`${colors.icon} mb-2`}>{intent.icon}</div>
              <h3 className="font-medium text-slate-800 dark:text-slate-100 text-sm">
                {intent.label}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {intent.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Additional Context (optional)
        </label>
        <textarea
          value={formData.additionalContext}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              additionalContext: e.target.value,
            }))
          }
          placeholder="Any specific points you want to mention, questions you want to ask, or tone preferences..."
          rows={2}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
      </div>
    </div>
  );
}
