# NWC Frontend 

This is the client-side interface for the 1977 NWC project. It is built with Create-React-App and [react-router-dom](https://www.npmjs.com/package/react-router-dom). The backend it interacts can be found at https://github.com/DataAnalyticsinStudentHands/NWC_backend.

## Development

Run: `npm run start` after configuring the environment variables.

We are following standard procedures for a Create-React-App [deployment](https://create-react-app.dev/docs/deployment/) using a [build](https://create-react-app.dev/docs/production-build/). 

The development version will use a subfolder /dev and uses the *package.json* file.

## Staging/Deployment

In a nutshell run: `npm run build`

For staging: use pm2 to serve the `build` directory

## Production

For production, use the *package_production.json*, *App_production.js* and *Navigation_production.js* files.

Run: `npm run build`

Move/copy the `\build` directory into web server document root directory.


### Environment variables

Change the variables found in config/.env.js e.g.:

```
const VARIABLES = {
	fetchBaseUrl: "http://localhost:1337",
	...
}

export default VARIABLES;
```
