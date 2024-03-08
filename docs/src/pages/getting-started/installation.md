### 1. Download The Browser Extension
The [AI Pay browser extension](https://chromewebstore.google.com/detail/ai-pay/igghgdjfklipjmgldcdfnpppgaijmhfg) is free to download and you automatically get $2 worth of free credits when you sign up.

The AI Pay browser extension will be required for meta tag validation and for starting a session while testing.

### 2. Install The NPM Package
```bash
npm i ai-pay
```

### 3. Sign Up Your Website
Visit the [AI Pay dashboard new website page](https://www.joinaipay.com/dashboard/newwebsite) and sign up your website.

### 4. Copy The Website Meta Tag
From [AI Pay dashboard](https://www.joinaipay.com/dashboard) navigate to the website details page (or sign up a new website). Copy the meta tag from the dashboard and paste it into the header of your website. The meta tag will look something like this.
```html
<meta 
  name="ai-pay-website-identifier" 
  content='{"websiteId":"{...}","websiteName":"{...}","websiteDescription":"{...}","recommendedCredit":{...},"requestUsageOnPageLoad":{...}}'
>
```

### 5. Validate The Meta Tag
The [AI Pay browser extension](https://chromewebstore.google.com/detail/ai-pay/igghgdjfklipjmgldcdfnpppgaijmhfg) will check each website that you visit for an AI Pay meta tag.
- If a valid meta tag is found a log will show in the console.
- If an invalid meta tag was found an error will show in the console.
- If no meta tag was found nothing will show in the console.
