# SongList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.7.

# Overall Theme
The theme from https://www.copera.org/ is used, and modified slightly to fit the overall theme of PERA site for testing purpose only .

*******************************************
    This site has nothing to do CO PERA.
*******************************************

# Open the page via github pages
https://shuxincolorado.github.io/song-list2/dist/song-list2/

## Enhanced features
This SPA is very similar to the one at https://shuxincolorado.github.io/song-list2/dist/song-list2/
The following features are add
* Full PWA support
* Push notification - Every time "Save" button is pressed, a push notification is sent to the client.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build for local box

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Build for production
Run `ng build --configuration=production --base-href=`https://shuxincolorado.github.io/song-list2/dist/song-list2/`

Your can use your url to replace --base-href part.

## Dependencies
This project uses the following modules:
* @angular/material
* angular-in-memory-web-api
* ng2-currency-mask
* @angular/pwa

## Assumptions
The project uses angular-in-memory-web-api which is a dummy api in memory. The data can't be saved.
We can only simulate restful API called. Once you refresh your brwoser, the data will be restored to its original state.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
