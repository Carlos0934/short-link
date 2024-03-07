export default function useClipboard() {
  const copy = (text: string) => {
    showTooltip();
    navigator.clipboard.writeText(text);
  };

  const showTooltip = () => {
    const tooltip = document.getElementById("snackbar")!;
    tooltip.textContent = "Copied!";
    tooltip.classList.toggle("opacity-0");

    setTimeout(() => {
      tooltip.classList.toggle("opacity-0");
      tooltip.textContent = "";
    }, 1000);
  };

  return { copy };
}
