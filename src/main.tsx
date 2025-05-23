import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Authenticator } from '@aws-amplify/ui-react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import { store } from './_store/store';
import { interceptor } from './utils/axios';
import { Amplify } from 'aws-amplify';
import { config } from './config/config';
import { AwsRum, AwsRumConfig } from 'aws-rum-web';
import React from 'react';

/*
try {
  const config: AwsRumConfig = {
    sessionSampleRate: 1,
    identityPoolId: "us-east-2:39672299-3060-4e8f-9893-0a931fa048a9",
    endpoint: "https://dataplane.rum.us-east-2.amazonaws.com",
    telemetries: ["performance","errors","http"],
    allowCookies: true,
    enableXRay: false
  };

  const APPLICATION_ID: string = 'fcb7d763-feef-4fed-b6f0-9df0cccf4734';
  const APPLICATION_VERSION: string = '1.0.0';
  const APPLICATION_REGION: string = 'us-east-2';

  const awsRum: AwsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
}
*/

interceptor();

Amplify.configure(config.AWS_CONFIG);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Authenticator.Provider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Authenticator.Provider>
    </Provider>
  </React.StrictMode>,
);
