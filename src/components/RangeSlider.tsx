import { createSignal } from "solid-js";
import type { ComponentProps } from "solid-js";

export default function RangeSlider(props: ComponentProps<"input">) {
  const [value, setValue] = createSignal("1");
  return (
    <>
      <input
        onInput={(event) => setValue(event.currentTarget.value)}
        type="range"
        min="1"
        max="10"
        {...props}
      />
      <p>{value}</p>
    </>
  );
}
