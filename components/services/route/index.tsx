export const IsCurrentRoute = (element: any, currentRoute: string): boolean => {
  //nav items without children
  if (!element.hasChild && element.route) {
    if (element.route == currentRoute) {
      return true;
    }
  }
  //nav items with children
  if (element.hasChild && element.route) {
    return Boolean(element?.children?.some((itemName: string) => currentRoute.includes(itemName)));
  }

  return false;
};
