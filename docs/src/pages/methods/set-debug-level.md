Setting the debug level tells the AI Pay npm package to send more logs and errors to the console. Setting a debug level is recommended while developing and testing.

## Example
```typescript
import { setDebugLevel } from "ai-pay/methods";

const isDevEnv = true; // Replace with logic to check if dev env
const isStagingEnv = false; // Replace with logic to check if staging env

if (isDevEnv) {
  // shows logs and errors in console
  setDebugLevel("all")
} else if (isStagingEnv) {
  // shows just errors in console
  setDebugLevel("error")
}
```