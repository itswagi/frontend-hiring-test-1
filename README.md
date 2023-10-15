## The deployed version of this frontend can be found at [Vercel](https://turing-tech-test-mu.vercel.app/calls)

### The above frontend is built on top of Nextjs and Antd. 
### Project structure is as follows components -> features -> pages -> src
### Other directories within the project are either helper directories for types or handle services such as api requests, providers and etc

### Auth
We store all token in httpOnly cookies by leveraging Nextjs's api routes to intercept requests, strip out access tokens and store them as httpOnly cookie. For a request from our frontend, we follow the same route, intercept the request, from the cookies, attach the header for authorization: bearer `access token` and ship the request off to the server.

### Requests
For requests we use axios and fetch depending on which request is server side and which is client side. On top of this, we use React-Query to manage our requests and maintain a store for caching and app wide access in different compoenents in the react tree

### Tables
For tables, we utilize React-Table which works really well with react-query. 

<<<<<<< HEAD
# :phone: TuringTech - Frontend technical test

This test is a part of our hiring process at TuringTech for the Frontend Engineer position. It should take you between 6 to 8 hours, depending on your experience, to implement the minimal version. But we thought about a few bonuses, so feel free to spend some time on them if you want.

*Feel free to apply on our [Careers Page](https://www.turing-tech.org/careers?github=true) and email us at hr@turingtechnologies.org.*

## Context

TuringTech is on a mission to revolutionize the business phone industry! This test is about (re) building a small part of our main application. You’ll use dedicated APIs providing mocked data for that.

## Exercise

The application can be built using any Frontend Framework/Library such as React, Angular, Vue. We do use React (especially Next.js) on most of our projects.

For the purpose of this test, you can use Bootstrap, Material or Ant Design for the base design library. Copy Styling of different components such as buttons, lists, fields etc. from the assets in the `/design-files` folder. 

This application must:
- Display a paginated list of calls that you’ll retrieve from the API.
- Display the call details view if the user clicks on a call. the view should display all the data related to the call itself.
- Be able to archive one or several calls
- Group calls by date
- Handle real-time events (Whenever a call is archived or a note is being added to a call, these changes should be reflected on the UI immediately)

Bonus:
- Use Typescript and Next.js
- Provide filtering feature, to filter calls by type (archived, missed …)
- Use GraphQL to fetch data
- Deploy your application to Netlify, GitHub Pages or Heroku

**Important Note**: We want you to build this small app as you'd have done it for your current job. (UI, UX, tests, documentation matters).

## APIs

There are 2 versions of the APIs for this test, so you can choose between:
- REST API or 
- GraphQL API.

Both expose the same data, so it’s really about which one you prefer.

### Model

Both APIs use the same models.

Call Model

```
type Call {
  id: ID! // "unique ID of call"
  direction: String! // "inbound" or "outbound" call
  from: String! // Caller's number
  to: String! // Callee's number
  duration: Float! // Duration of a call (in seconds)
  is_archived: Boolean! // Boolean that indicates if the call is archived or not
  call_type: String! // The type of the call, it can be a missed, answered or voicemail.
  via: String! // Aircall number used for the call.
  created_at: String! // When the call has been made.
  notes: Note[]! // Notes related to a given call
}
```

Note Model

```
type Note {
  id: ID!
  content: String!
}
```

### GraphQL API (For REST API, scroll down)

Base URL: https://frontend-test-api.aircall.dev/graphql

#### Authentication

You must first authenticate yourself before requesting the API. You can do so by executing the Login mutation. See below.

#### Queries

All the queries are protected by a middleware that checks if the user is authenticated with a valid JWT.

`paginatedCalls` returns a list of paginated calls. You can fetch the next page of calls by changing the values of `offset` and `limit` arguments.

```
paginatedCalls(
  offset: Float = 0
  limit: Float = 10
): PaginatedCalls!

type PaginatedCalls {
  nodes: [Call!]
  totalCount: Int!
  hasNextPage: Boolean!
}
```

`activitiy` returns a single call if any, otherwise it returns null.

```
call(id: Float!): Call
```

`me` returns the currently authenticated user.

```
me: UserType!
```

```
type UserType {
  id: String!
  username: String!
}
```

#### Mutations

To be able to grab a valid JWT token, you need to execute the `login` mutation.

`login` receives the username and password as 1st parameter and return the access_token and the user identity.

```graphql
login(input: LoginInput!): AuthResponseType!

input LoginInput {
  username: String!
  password: String!
}

interface AuthResponseType {
  access_token: String!
  user: UserType
}
```

Once you are correctly authenticated you need to pass the Authorization header for all the next calls to the GraphQL API.

```JSON
{
  "Authorization": "Bearer <YOUR_ACCESS_TOKEN>"
}
```

Note that the access_token is only available for 10 minutes. You need to ask for another fresh token by calling the `refreshToken` mutation before the token gets expired.

`refreshToken` allows you to ask for a new fresh token based on your existing access_token

```graphql
refreshToken: AuthResponseType!
```

This will send you the same response as the `login` mutation.

You must use the new token for the new requests made to the API.

`archiveCall` as the name implies it either archive or unarchive a given call.If the call doesn't exist, it'll throw an error.

```
archiveCall(id: ID!): Call!
```

`addNote` create a note and add it prepend it to the call's notes list.

```
addNote(input: AddNoteInput!): Call!

input AddNoteInput {
  activityId: ID!
  content: String!
}
```

#### Subscriptions

To be able to listen for the mutations/changes done on a given call, you can call the `onUpdateCall` using an actibity ID.

`onUpdateCall` receives the call ID as the 1st parameter and returns a call instance.

```
onUpdateCall(id: ID): Call!
```

Now, whenever a call data changed either via the `addNote` or `archiveCall` mutations, you will receive a subscription event informing you of this change.

_Don't forget to pass the Authorization header with the right access token in order to be able to listen for these changes_

### REST API

Base URL: https://frontend-test-api.aircall.dev

#### Authentication

You must first authenticate yourself before requesting the API. You can do so by sending a POST request to `/auth/login`. See below.

#### GET endpoints

All the endpoints are protected by a middleware that checks if the user is authenticated with a valid JWT.

`GET` `/calls` returns a list of paginated calls. You can fetch the next page of calls by changing the values of `offset` and `limit` arguments.

```
/calls?offset=<number>&limit=<number>
```

Response:
```
{
  nodes: [Call!]
  totalCount: Int!
  hasNextPage: Boolean!
}
```

`GET` `/calls/:id` return a single call if any, otherwise it returns null.

```
/calls/:id<uuid>
```

`GET` `/me` return the currently authenticated user.

```
/me
```

Response
```
{
  id: String!
  username: String!
}
```

#### POST endpoints

To be able to grab a valid JWT token, you need to call the following endpoint:

`POST` `/auth/login` receives the username and password in the body and returns the access_token and the user identity.

```
/auth/login

// body
{
  username: String!
  password: String!
}
```

Once you are correctly authenticated you need to pass the Authorization header for all the next calls to the REST API.

```JSON
{
  "Authorization": "Bearer <YOUR_ACCESS_TOKEN>"
}
```

Note that the access_token is only available for 10 minutes. You need to ask for another fresh token by calling the `/auth/refresh-token` endpoint before the token gets expired.

`POST` `/auth/refresh-token` allows you to ask for a new fresh token based on your existing access_token

This will return the same response as the `/auth/login` resource.

You must use the new token for the new requests made to the API.

`POST` `/calls/:id/note` create a note and add it prepend it to the call's notes list.

```
`/calls/:id/note`

Body
{
  content: String!
}
```

It returns the `Call` as a response or an error if the note doesn't exist.

#### PUT endpoints

`PUT` `/calls/:id/archive` as the name implies it either archive or unarchive a given call. If the call doesn't exist, it'll throw an error.

```
PUT /calls/:id/archive
```

#### Real-time

In order to be aware of the changes done on a call, you need to subscribe to this private channel: `private-aircall` and listen for the following event: `update-call` which will return the call payload.

This event will be called each time you add a note or archive a call.

Note that, you need to use Pusher SDK in order to listen for this event.

Because this channel is private you need to authenticate first, to do that, you need to make 
- `APP_AUTH_ENDPOINT` point to: `https://frontend-test-api.aircall.dev/pusher/auth`
- set `APP_KEY` to `d44e3d910d38a928e0be`
- and set `APP_CLUSTER` to `eu`

#### Errors

The REST API can return a different type of errors:

`400` `BAD_REQUEST` error, happens when you provide some data which doesn't respect a given shape.

Example
```
{
  "statusCode": 400,
  "message": [
    "content must be a string",
    "content should not be empty"
  ],
  "error": "Bad Request"
}
```

`401` `UNAUTHORIZED` error, happens when the user is not authorized to perform an action or if his token is no longer valid

Example
```
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

`404` `NOT_FOUND` error, happens when the user requests a resource that no longer exists.

Example
```
{
  "statusCode": 404,
  "message": "The call does not exist!",
  "error": "Not Found"
}
```
## Does your UI looks like the image below?
### If YES then you're doing better than 60% of the applicants.

![Calls List](https://user-images.githubusercontent.com/88223175/184556209-23ed6342-5f9b-4b7a-b243-5cde59704d3b.png)

## Code Submit
Please organize, design, test and document your code as if it were going into production, create a loom video and send us a [pull request](https://opensource.com/article/19/7/create-pull-request-github). 

We will review it and get back to you in order to talk about your code! 

All the best and happy coding.
=======
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
>>>>>>> source-repo
