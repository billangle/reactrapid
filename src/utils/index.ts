export const generateUniqueFileName = (originalFileName: string) => {
  const timestamp = Date.now();
  const extension = originalFileName.split('.').pop();
  const uniqueName = timestamp + '.' + extension;
  return uniqueName;
};


export const removeDuplicates = (array: any[], ...props: any) => {
  const seen: Record<string, boolean> = {};
  return array?.filter((item) => {
    const key = props?.map((prop: string | number) => item[prop]).join('-');
    if (seen[key]) {
      return false; // Duplicate found, exclude it
    }
    seen[key] = true; // Record this combination of props
    return true;
  });
};
