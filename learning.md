# Describe issues you encountered and how you fixed them

## Encountered a race condition between RTK(React toolkit) and Clerk

- Within the rtk [api.ts](/client/state/api.ts) where i have the setup to make calls to my Express Backend running on a different port, i need a validation mechanism for the api calls so I decided to leverage Clerk and use the signed in user's session token which is issued by clerk and is stored in the browser as a cookie. I created a [hook](/client/hooks/useAuthenticatedUser.ts) which was meant to get the user's token and pass them to the query to be used everytime for api request as an implementation of security. I run into a race condition where the query was being executed before the hook could run, the hook would be executed on page load and store the token in local states using useState then passed to the query as extras.
  - Solution: Instead of setting the token in the `prepareHeaders` prop to used, I instead set it for each request. This bet the race consition by ensuring that the query waits for the token before making requests. I also used a skipToken condition

## Server-Side Filtering over Client-Side Filtering

- For large-scale applications, there's a preference for server-side filtering. We push the filters onto the url as URLSearchParams and send them over to the backend to be destructured and used to query for the needed information. This is better than sending millions of data to the frontend each time, if there are millions of users this quickly becomes a performance bottleneck.
  E.g: `/search?type=Single_Family&beds=4&baths=2` or `/q?` where q is query.

## Creating a Lease when a request comes to create an Application for a possible Tenant is bad design

`within my rental app, when a new application is created, a new lease is created and the lease is connected to the application, why is that? also when the application is approved, a new lease is created then connected to the application`

The behavior you're describing suggests there might be some confusion in your rental app's workflow design. Let me explain what's likely happening and what the proper flow should be:

### Current Issues with Your Flow:

Creating a lease when application is created doesn't make logical sense because:

An application is just a request to rent - not an agreement.
You don't know if the applicant will be approved yet.
Creating a lease prematurely assumes the rental will happen.
Creating another lease when approved creates duplicate records and confusion.

### Proper Rental Application Workflow:

Here's how it should typically work:

1. Application Stage
   Tenant submits application → Application record created
   Status: "pending", "under_review", "approved", "rejected"
   NO lease created yet
2. Approval Stage
   Application approved → Lease record created
   Application status: "approved"
   Lease status: "draft" or "pending_signature"
3. Lease Execution
   Lease signed by both parties → Lease becomes active
   Lease status: "active"
   Application can be archived or marked "completed"
   Why This Separation Matters:
   Applications track the screening process (income verification, background checks, etc.)
   Leases are legal contracts that only exist after approval
   One application = potentially one lease (if approved)
   Multiple people can apply for the same property, but only one gets the lease
   Recommended Database Structure:
   ```typescript
   // Application Model
   Application {
   id
   propertyId
   tenantId
   status: "pending" | "approved" | "rejected"
   applicationDate
   // screening info, income, references, etc.
   }
   // Lease Model
   Lease {
   id
   applicationId // Links back to the approved application
   propertyId
   tenantId
   status: "draft" | "active" | "terminated"
   startDate
   endDate
   rentAmount
   // lease terms, clauses, etc.
   }
   ```
   Fixing Your Current Flow:
   Remove lease creation from the application creation process
   Only create a lease when an application is approved
   Link the lease to the original application for audit trail
   Update application status to "approved" when lease is created
   This creates a cleaner, more logical workflow that matches real-world rental processes.
