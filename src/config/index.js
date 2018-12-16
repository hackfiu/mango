/*******************************
        MANGO THEME CONFIG
*******************************/

const config = {
  /*
      CORE:
      @EVENT_LOGO: String(Main logo file name)
      @EVENT_MAIN_COLOR: String(Main event color)
  */

  EVENT_LOGO: "logo.png",
  EVENT_MAIN_COLOR: "#88D0EE",

  /*
      CORE:
      @LOGIN_OVERLAY: Boolean(Gradient overlay on Login route)
      @LOGIN_COVER: Boolean(Image Cover on Login Route)
      @LOGIN_OVERLAY_COLOR: 
                    Gradient: "linear-gradient(rgba(X,X,X, 0.7), rgba(x, x, x, 0.7))"  
      @LOGIN_COVER: String(Main BG file name)
  */

  USE_OVERLAY: true,
  USE_COVER: true,
  LOGIN_OVERLAY_COLOR:
    "linear-gradient(rgba(100, 178, 230, 0.7),rgba(100, 156, 230, 0.7))",
  LOGIN_COVER: "cover.jpg",

  APPLICATION_EXTRA_FIELDS: [
    // insert extra fields here.
  ]
};

export default config;
