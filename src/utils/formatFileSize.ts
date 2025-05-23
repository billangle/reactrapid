export const formatFileSize = (size: number) => {
  const mbSize = size / 1024 / 1024;
  return `${mbSize?.toFixed(2)} MB`;
};
