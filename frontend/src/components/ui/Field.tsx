import { useState, useId } from 'react'

interface InputFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}

function InputField({ name, type = "text", placeholder, value, onChange}: InputFieldProps) {
  const id = useId();
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPw ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={[
            "w-full border-0 border-b ",
            "py-3 transition-all duration-200 outline-none",
            "focus:border-green-500 ",
            isPassword ? "pr-11" : "",  
          ].join(" ")}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPw(s => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-sm"
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? "" : "👁"}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField