// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


//אותנטיקציה זה לדעת מי היוזר שנמצא ומה האיי די שלו 
//..ניתן לעשות אותנטיקציה באמצעות כמה דרכים. שם משתמש וסיסמה/פייסבוק/גוגל
export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyB3NiJojMpHYkjc1uxewCMI8kuDUOqu280",
    authDomain: "ng-chat-e75cb.firebaseapp.com",
    projectId: "ng-chat-e75cb",
    storageBucket: "ng-chat-e75cb.appspot.com",
    messagingSenderId: "6945029891",
    appId: "1:6945029891:web:148d3dceb77c94bca27336",
    measurementId: "G-NS2QVC7RFF"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
