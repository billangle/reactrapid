const config: any = {
  AWS_CONFIG: {
    Auth: {
      region: import.meta.env.VITE_AWS_REGION,
      userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
      userPoolWebClientId: import.meta.env.VITE_AWS_APP_CLIENT_ID,
      identityPoolId: import.meta.env.VITE_AWS_IDENTITY_POOL_ID,
    },
    Storage: {
      AWSS3: {
        bucket: import.meta.env.VITE_AWS_USER_FILES_S3_BUCKET,
        region: import.meta.env.VITE_AWS_USER_FILES_S3_BUCKET_REGION,
      },
    },
  },
  IMAGE_BASE_URL: import.meta.env.VITE_IMAGE_BASE_URL,
  DOC_BASE_URL: import.meta.env.VITE_DOC_BASE_URL,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  BASE_REPORT_API_URL: import.meta.env.VITE_BASE_REPORT_API_URL,
  USE_SSO_LOGIN: import.meta.env.VITE_USE_SSO_LOGIN === 'false',
  ENV: import.meta.env.VITE_ENV,
};

export { config };

