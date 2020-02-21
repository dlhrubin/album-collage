// Helper function to get computed style from DOM
function getStyle(element, property) {
  let styleValue = window.getComputedStyle(document.getElementsByClassName(element)[0], null)
    .getPropertyValue(property);
  styleValue = parseInt(styleValue.substr(0, styleValue.length - 2), 10);
  return styleValue;
}
export default getStyle;
