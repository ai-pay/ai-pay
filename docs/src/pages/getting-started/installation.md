### 1. Sign Up Your Website
Visit the [AI Pay dashboard new website page](https://www.joinaipay.com/dashboard/new-website) and sign up your website.

#### 1.1. Copy The Website Meta Tag
From [AI Pay dashboard](https://www.joinaipay.com/dashboard) navigate to the website details page (or sign up a new website). Copy the meta tag from the dashboard and paste it into the header of your website. The meta tag will look something like this.
```html
<meta 
  name="ai-pay-website-identifier" 
  content='{"websiteId":"{...}","websiteName":"{...}","websiteDescription":"{...}","recommendedCredit":{...},"requestUsageOnPageLoad":{...}}'
>
```

#### 1.2. Validate The Meta Tag
The [AI Pay browser extension](https://chromewebstore.google.com/detail/ai-pay/igghgdjfklipjmgldcdfnpppgaijmhfg) will check each website that you visit for an AI Pay meta tag. It is free to download and you automatically get $5 worth of free credits when you sign up.
- If a valid meta tag is found a log will show in the console.
- If an invalid meta tag was found an error will show in the console.
- If no meta tag was found nothing will show in the console.


### 2. Install The NPM Package
```bash
npm i ai-pay
```

### 3. Start Using AI APIs
After signing up the website and installing the meta tag the website can now listen for a users session state. During an active session the website can use any of the supported AI APIs.
