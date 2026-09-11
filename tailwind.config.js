/**
 * NOTE: this project uses Tailwind CSS v4 via the @tailwindcss/vite plugin.
 * v4 is configured in CSS, not JS — see the `@theme` block in src/app.css.
 * This file is kept only so tooling that expects it does not complain; the
 * values below are NOT read by the build.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
};
