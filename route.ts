/**
 * An array of routes that are accessible to the public.
 * THEY DO NOT REQUIRE AUTHENTICATION TO BE ACCESSED
 * @type {string[]}
 */
export const publicRoutes = ["/", "/signin", "/signup"];

/**
 * An array of routes that are used for authentication.
 * THEY WILL REDIRECT LOGGED IN USER TO PROTECTED ROUTES
 * @type {string[]}
 */
export const authRoutes = ["/signin", "/signup"];

/**
 * The prefix for API authentication route.
 * ROUTE THAT STARTS WITH THIS PREFIX ARE USE FOR API AUTHENTICATION
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * THE DEFAULT REDIRECT PATH AFTER SUCCESSFUL SIGNIN
 * @type {string}
 */
export const DEFAULT_SIGNIN_REDIRECT = "/";
