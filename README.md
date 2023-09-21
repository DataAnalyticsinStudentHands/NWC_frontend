# NWC Frontend 

This is the client-side interface for the 1977 NWC project. It is built with Create-React-App and [react-router-dom](https://www.npmjs.com/package/react-router-dom). The backend it interacts can be found at https://github.com/DataAnalyticsinStudentHands/NWC_backend.

## Development

Run: 
```bash
npm run start
```
after configuring the environment variables.

We are following standard procedures for a Create-React-App [deployment](https://create-react-app.dev/docs/deployment/) using a [build](https://create-react-app.dev/docs/production-build/). 

The development version will use a subfolder /dev and uses the *package.json* file.

## Staging/Deployment

In a nutshell run: 
```bash
npm run build
```

For staging: use pm2 to serve the `build` directory

## Production

For production, use the *package_production.json*, *App_production.js* and *Navigation_production.js* files.
Run:
```bash
npm run build
```

Move/copy the `\build` directory into web server document root directory.


### Environment variables

We are using [environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables) and the following must exists:

```
REACT_APP_API_URL = 
REACT_APP_MAPBOX_ACCESS_TOKEN = 
REACT_APP_OVERLAYMP4 =
```

## Style System

We are adopting SASS to develop our styles.

* All basic styles and component styles are stored under the styles folder.
* All individual pages will have their own SCSS file if it's necessary. 
  * For convenience, the page's SCSS file can be saved on the same path as their js file. But make sure to import the file into /styles/_styles.scss instead of the js file