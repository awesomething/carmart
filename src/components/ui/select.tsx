import { ChangeEvent, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { label: string; value: string }[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    subheading?: string;
    noDefault?: boolean;
}

export const Select = (props: SelectProps) => {

    const {
        label, options, onChange, className, subheading, noDefault,
        ...rest } = props;

    return (
        <div className={cn("mt-1", className)}>
            {label && <div className="text-sm font-semibold">{label}</div>}
            <div className="mt-1">
                <select
                    onChange={onChange}
                    value={value ?? ""}
                    className={cn(selectClassName,"disabled:bg-gray-100 w-full px-3 py-2 border-input border rounded-md focus:outline-hidden custom-select appearance-none pr-12 bg-no-repeat"
                    )}

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
