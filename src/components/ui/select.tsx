import { cn } from "@/lib/utils";
import { ChangeEvent, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  selectClassName?: string;
  noDefault?: boolean;
}

export const Select = (props: SelectProps) => {
  const {
    label,
    value,
    options,
    onChange,
    className,
    selectClassName,
    noDefault = true,
    ...rest
  } = props;

  return (
    <div className={cn("mt-1", className)}>
      {label && <div className="text-sm font-semibold">{label}</div>}
      <div className="mt-1">
        <select
          onChange={onChange}
          value={value ?? ""}
          className={cn(
            selectClassName,
            "px-3 py-2 border border-primary rounded-md appearance-none pr-12 bg-black text-white hover:bg-gray-800 focus:bg-gray-900 focus:text-white focus:outline-none w-full"
          )}
          

          {...rest}
        >
          {!noDefault && <option value="">Select</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
