// Helper function to get computed style from DOM
export function getStyle(element, property) {
    let styleValue = window.getComputedStyle(document.getElementsByClassName(element)[0], null).getPropertyValue(property);
    styleValue = parseInt(styleValue.substr(0, styleValue.length - 2));
    return styleValue
}

