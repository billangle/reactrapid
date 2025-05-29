

This repo consists of all the artifacts related to the **ReactJS**-based application which utilizes **Redux Toolkit** to manage state and provide middleware functionality. It is utilizing **Vite** to build/package the application and utilizes **SCSS** for CSS application styling. The left navigation component provides users access to modules. The initial implementation has two modules; users and reports, as an example.

This application is deployed via **GitHub Workflows** which will deploy the build directory to an **S3** bucket. This S3 bucket is the origin server for **AWS Cloudfront CDN**, which makes the application available to users. The service deployment can be viewed in the ci-cd/cdk directory. The UI developer will not need to make changes to the CDK.

<br>

-----

# Documentation

## Module Strategy
Each module is defined in the modules directory. This will contain the application routes supported by the module, the components specific to the modules as well as the API's utilized by the module. The goal is to have a strong separation of the shared components, required for all parts of the application, from specific application functionality. 



## Application URLS

- Production: https://app.rapidright.net

## Image URLS

The images deployment is designed to allow the React UI to have access to various image files. The reason to have a separate URL and deployment, is to avoid building the images within the React application. The images have the same Cloudfront, WAF, S3 deployment as the React application.


- Production: https://images.rapidright.net


## Running on the local environment
The developer should have NodeJS installed. (https://nodejs.org/en). The developer will need to follow these basic steps:

- npm install
- npm run start:dev

The start:dev command will start the React application on port 5173, by default. Here is an example URL:
- http://localhost:5173/login

The start:dev will ensure that the UI is connected to the development environment backend resources. These resources are defined in the env directory. Each supported environment has a dot env file. The file that defines the development environment is:
- .env.dev

This implementation will allow the developer to make changes to the React user interface, while being able to utilize an active back-end environment. The REST APIs have been configured to support CORS. Thus, if you find that CORS errors are occurring, this is often caused by other factors. Common problems are:
- end point definition is not correct 
- end point HTTP method is not correct
- end point requires TOKEN but no TOKEN is presented

The implemention of the environments is defined in package.json.

## Testing

Unit testing implemented utilizing Vitest. https://vitest.dev/

## UI Mockup - Storybook

Mockups for both REST API and for displaying pages without requiring a call within the application will be accomplished using Storybook. 



