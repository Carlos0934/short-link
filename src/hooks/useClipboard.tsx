export default function useClipboard() {
  const copy = (text: string) => {
    showTooltip();
    navigator.clipboard.writeText(text);
  };

  const showTooltip = () => {
    const tooltip = document.createElement("div");
    tooltip.textContent = "Copied!";
    tooltip.classList.add(
      "absolute",
      "bg-gray-700",
      "text-white",
      "text-xs",
      "px-2",
      "py-1",
      "z-10",
      "rounded-md",
      "-translate-x-1/2",
      "left-1/2",
      "bottom-6",
      "transition-all"
    );
    document.body.appendChild(tooltip);

    setTimeout(() => {
      tooltip.classList.add("opacity-0");
      setTimeout(() => {
        document.body.removeChild(tooltip);
      }, 1000);
    }, 1000);
  };

  return { copy };
}
