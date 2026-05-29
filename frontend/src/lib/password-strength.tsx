type PasswordStrengthProps = {
  password: string;
};

const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  if (!password.length) {
    return null;
  }

  let strength = 0;

  if (password.length > 0) {
    strength = 1;
  }

  if (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  ) {
    strength = 2;
  }

  if (password.length >= 12 && /[^A-Za-z0-9]/.test(password)) {
    strength = 3;
  }

  return (
    <div className="mt-3">
      <div className="flex gap-2">
        <div
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            strength >= 1 ? "bg-red-500" : "bg-outline-variant"
          }`}
        />

        <div
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            strength >= 2 ? "bg-primary" : "bg-outline-variant"
          }`}
        />

        <div
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            strength >= 3 ? "bg-green-600" : "bg-outline-variant"
          }`}
        />
      </div>

      <p
        className={`mt-2 font-ui text-[11px] uppercase tracking-[0.2em] ${
          strength === 1
            ? "text-red-500"
            : strength === 2
              ? "text-primary"
              : "text-green-600"
        }`}
      >
        {strength === 1 && "Weak"}
        {strength === 2 && "Medium"}
        {strength === 3 && "Strong"}
      </p>
    </div>
  );
};

export default PasswordStrength;
