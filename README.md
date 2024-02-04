# Auto Trading System

## Overview

The Auto Trading System is a robust tool designed to automate trading operations on the Binance platform. This system streamlines the trading process by executing predefined strategies and actions based on configured parameters. Follow the steps below to set up and run the Auto Trading System effortlessly.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (recommended version)
- [Yarn](https://yarnpkg.com/) package manager

## Setup Instructions

### Step 1: Install Dependencies

Use Yarn to install the required dependencies. Run the following command in your terminal:

```bash
yarn
```
## Step 2: Configure Environment Variables

- Create a .env file in the root directory based on the provided env.example file. Update the values in the .env file to match your specific configuration.

## Step 3: Start the Server in Production Mode

- Launch the server in production mode to initiate the Auto Trading System. Execute the following command:

yarn start:prod

## Step 4: Run Binance Service Script

- Execute the Binance service script to enable communication with the Binance platform. Run the following command:

yarn start:binanceService



These steps will set up and run the Auto Trading System in your environment. Ensure that you have provided accurate configuration values in the .env file for seamless operation.
