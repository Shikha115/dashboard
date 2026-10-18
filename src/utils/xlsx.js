// SheetJS is ~400 KB. Load it only when someone exports or imports a sheet,
// instead of with every page that has an Export button.
export const loadXLSX = () => import("xlsx");
