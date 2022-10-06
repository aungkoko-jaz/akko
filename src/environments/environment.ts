// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    api_url: 'https://localhost:7239/api',
    file_api_url: 'https://localhost:7239/api/fileservice', // Single file upload api url
    multi_file_api_url: 'https://localhost:7239/api/multifileservice', // Multiple file upload url
    SecretKey: 'AnGuLaR@PROJECT@2022',
    SecretSalt: 'pyaesone22@ANGULAR@PrOjEcT',
    minPasswordLength: 8,
    localstorage_prefix: 'gwttraining@2022_'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
