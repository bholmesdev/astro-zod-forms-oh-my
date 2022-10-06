import { ComponentProps, createSignal } from "solid-js";
import { ZodError } from "zod";
import { parsePlanetForm } from "~utils";
import RangeSlider from "./RangeSlider";

export default function Form(props: ComponentProps<"form">) {
  const [fieldErrors, setFieldErrors] = createSignal({});
  return (
    <form
      {...props}
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        try {
          parsePlanetForm(form);
        } catch (e) {
          if (e instanceof ZodError) {
            setFieldErrors(e.flatten().fieldErrors);
          }
        }
        const res = await fetch("", {
          method: "POST",
          body: form,
        }).then((res) => res.json());
      }}
    >
      <label for="planet__name">Planet</label>
      <input required type="text" name="name" id="planet__name" />
      {fieldErrors().name ? (
        <p style="color: red">{fieldErrors().name}</p>
      ) : null}
      <label for="planet__rating"> Rating on scale of 1-10</label>
      <RangeSlider required name="rating" id="planet__rating" />
      <button type="submit">Lift off!</button>
    </form>
  );
}
