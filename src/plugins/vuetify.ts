/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

// Styles
import "@mdi/font/css/materialdesignicons.css"; // Import Material Design Icons
import "vuetify/styles"; // Import Vuetify styles

// Composables
import { createVuetify } from "vuetify";

// Vuetify Configuration
export default createVuetify({
  icons: {
    defaultSet: "mdi", // Set Material Design Icons as default
  },
  theme: {
    defaultTheme: "light", // Set the default theme to light
  },
});
