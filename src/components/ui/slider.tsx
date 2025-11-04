import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/app/lib/utils";

type SliderProps = Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  "onValueChange" | "value"
> & {
  value: number;
  onChange: (v: number) => void;
  showValue?: boolean;
};

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      value,
      defaultValue=[0,10],
      onChange,
      min = 0,
      max = 10,
      step = 1,
      showValue = true,
      ...props
    },
    ref
  ) => {
    const pct = (n: number) =>
      ((n - Number(min)) / (Number(max) - Number(min))) * 100;

    const steps: number[] = React.useMemo(() => {
      const out: number[] = [];
      for (let n = Number(min); n <= Number(max); n += Number(step)) out.push(n);
      return out;
    }, [min, max, step]);

    return (
      <div className={cn("w-full", className)}>
        <div className="relative w-full py-4">

          <SliderPrimitive.Root
            defaultValue={defaultValue}
            ref={ref}
            className="relative flex w-full select-none items-center"
            value={[value]}
            onValueChange={(v) => onChange(v[0] ?? value)}
            min={min}
            max={max}
            step={step}
            aria-label="Score filter"
            aria-valuetext={`${value}`}
            {...props}
          >
            <div className="relative w-full">
              <SliderPrimitive.Track className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <SliderPrimitive.Range className="absolute h-full bg-blue-600" />
              </SliderPrimitive.Track>
            </div>

            <SliderPrimitive.Thumb
              className={cn(
                "block h-5 w-5 rounded-full border-2 border-white bg-blue-600 shadow",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                "disabled:pointer-events-none disabled:opacity-50"
              )}
            />
            <SliderPrimitive.Thumb
              className={cn(
                "block h-5 w-5 rounded-full border-2 border-white bg-blue-600 shadow",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                "disabled:pointer-events-none disabled:opacity-50"
              )}
            />
          </SliderPrimitive.Root>
        </div>

        {/* required min/max labels */}
        <div className="mt-1 flex w-full items-center justify-between text-xs text-gray-600">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";
export default Slider;
