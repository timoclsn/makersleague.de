import { cva, VariantProps } from "cva";
import { Info } from "lucide-react";
import { ReactNode } from "react";
import { colorMap } from "./utils";

const infoBox = cva({
  base: "mt-6 flex items-baseline gap-2 p-6",
  variants: {
    color: {
      blue: [colorMap.blue.bg, colorMap.blue.text],
    },
  },
});

interface Props extends VariantProps<typeof infoBox> {
  children: ReactNode;
  className?: string;
}

export const InfoBox = ({ children, color = "blue", className }: Props) => {
  return (
    <div className={infoBox({ color, className })}>
      <Info size={16} className="flex-none translate-y-0.5" />
      <p>{children}</p>
    </div>
  );
};
