export function assignProps(element, props) {
  if (!element) return;
  Object.entries(props).forEach(([key, value]) => {
    if (value !== undefined) {
      element[key] = value;
    }
  });
}
