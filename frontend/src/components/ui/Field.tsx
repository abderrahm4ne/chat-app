import { useState, useId } from 'react'

interface InputFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  disabled?: boolean;
}

function InputField({ name, type = "text", placeholder, value, onChange, disabled}: InputFieldProps) {
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
          disabled={disabled}
          onChange={e => onChange(e.target.value)}
          className={[
            "w-full border-0 border-b text-primary-text",
            "py-3 transition-all duration-200 outline-none",
            "focus:border-button-background focus:ring-0 ",
            isPassword ? "pr-11" : "",  
          ].join(" ")}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPw(s => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black hover:text-black/40 transition-colors text-md hover:cursor-pointer"
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? "HIDE" : "👁"}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField