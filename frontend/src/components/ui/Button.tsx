
function SubmitButton({ loading, children, onClick }: { loading?: boolean; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={[
        "w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200",
        "bg-button-background text-white shadow-lg shadow-green-500/25",
        "hover:bg-button-hover-background hover:shadow-green-500/40 hover:-translate-y-0.5 hover:cursor-pointer",
        "active:translate-y-0 active:shadow-none",
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-button-hover-background focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
      ].join(" ")}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Processing…
        </span>
      ) : children}
    </button>
  );
}

export default SubmitButton;