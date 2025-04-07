# TripFront App

A Next.js application for managing group trips and coordinating contributions.

## Features

- Create new trips with fundraising goals
- Join existing trips using a trip code
- Track progress towards fundraising goals
- Manage participant contributions
- Responsive design for all devices
- Dark mode support

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- [React 19](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Bun](https://bun.sh/) (Package Manager)

## Getting Started

First, install the dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing the Application

The application is currently running with mock data and client-side state. Here's how to test each feature:

### Create a Trip

1. Click on "Create a Trip" on the homepage
2. Fill out the form with the following test data:
   - Trip Name: "Summer Beach Trip"
   - Fundraising Goal: 1500
   - Number of People: 6
   - Trip Details: Add some description about the trip
   - Fundraising Deadline: Select a future date
3. Click "Create Trip"
4. You'll be redirected to a trip detail page with a randomly generated trip code

### Join a Trip

1. Click on "Join a Trip" on the homepage or navigate to "/join"
2. Enter a trip code (any code will work in this demo version)
3. Click "Join Trip"
4. You'll be redirected to a trip detail page with dummy data

### View Trip Details

When viewing a trip (either after creating or joining):

1. The progress bar shows the funding progress toward the goal
2. The participants bar shows how many spots are filled
3. Trip details section displays the trip description
4. Contributors table shows all participants and their contributions
5. Important Information section shows the trip code, deadline, and days remaining

### Add/Update Contributions

1. On a trip detail page, use the form on the right side
2. Enter your name and contribution amount
3. Click "Submit Contribution"
4. Your contribution will be added to the list and the progress bars will update
5. If you use an existing name, it will update that person's contribution instead

### Test the Full Trip Flow

1. Create a new trip
2. Note the trip code from the details page
3. Open a new browser tab and go to the Join page
4. Enter the trip code from step 2
5. Add contributions using different names
6. Keep adding until you reach the maximum participants to see the "Trip is already full" message

## Type System

The application uses TypeScript with a comprehensive type system that mirrors the original Flask models:

- `app/types/models.ts` - Data models (Trip, Commitment)
- `app/types/api.ts` - API request/response types
- `app/types/utils.ts` - Helper functions and type guards
- `app/types/index.ts` - Type exports

These types ensure consistency across the application and provide excellent IDE support for development.

## Project Structure

- `app/` - Next.js App Router directory
  - `create/` - Create trip page
  - `join/` - Join trip page
  - `trip/[code]/` - Trip detail page with contribution form
  - `types/` - TypeScript type definitions
  - `page.tsx` - Homepage
  - `layout.tsx` - Root layout
  - `globals.css` - Global styles

## Development Notes

- The app currently uses client-side state management only
- In a production app, you would add an API layer to persist data
- The form validation uses HTML5 validation attributes
- Dark mode is supported via CSS variables and media queries

## Building for Production

```bash
bun run build
```

## Starting Production Server

```bash
bun run start
```

## Learn More

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and configured to use Tailwind CSS v4.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
