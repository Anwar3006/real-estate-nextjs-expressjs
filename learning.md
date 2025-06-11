# Describe issues you encountered and how you fixed them

## Encountered a race condition between RTK(React toolkit) and Clerk

- Within the rtk [api.ts](/client/state/api.ts) where i have the setup to make calls to my Express Backend running on a different port, i need a validation mechanism for the api calls so I decided to leverage Clerk and use the signed in user's session token which is issued by clerk and is stored in the browser as a cookie. I created a [hook](/client/hooks/useAuthenticatedUser.ts) which was meant to get the user's token and pass them to the query to be used everytime for api request as an implementation of security. I run into a race condition where the query was being executed before the hook could run, the hook would be executed on page load and store the token in local states using useState then passed to the query as extras.
  - Solution: Instead of setting the token in the `prepareHeaders` prop to used, I instead set it for each request. This bet the race consition by ensuring that the query waits for the token before making requests. I also used a skipToken condition
