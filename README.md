# CodersLink / Zapier Integration Challenge

## Overview
This project is a **Zapier CLI integration** built for the CodersLink Skill Test.  
It connects with **[TheCatAPI](https://thecatapi.com/)**, a public API that provides cat images and related features.

The integration includes:

- **Authentication**: API Key (sent via header `x-api-key`).  
- **Trigger**: `New Image` – retrieves the latest images from TheCatAPI.  
- **Action**: `Create Favorite` – marks an image as favorite.  

This setup demonstrates how to handle **custom authentication**, **polling triggers**, and **POST actions** inside a Zapier CLI app.

🔗 **Zapier App Link (Private for now):** [CodersLink TheCatAPI on Zapier](https://developer.zapier.com/app/230836/version/1.0.0)

---

## Requirements
- Node.js **18 or higher**  
- [Zapier Platform CLI](https://github.com/zapier/zapier-platform) (`npm i -g zapier-platform-cli`)  
- Free API Key from [TheCatAPI Dashboard](https://thecatapi.com/)  

---

## Setup
```bash
# install dependencies
npm install

# login to Zapier
zapier login

# validate integration
zapier validate

# push the integration to your Zapier account
zapier push
```

---

## Usage
1. In the Zapier editor, create a new Zap using this app.  
2. Connect your account by entering your API Key.  
3. Add the **Trigger: New Image** to fetch sample images.  
4. Add the **Action: Create Favorite** and pass an `image_id` from the trigger results.  
5. Test both steps.  
   - A successful action returns:  
     ```json
     { "message": "SUCCESS", "id": "..." }
     ```

---

## Trade-offs
- **Polling vs Webhooks**: Chose polling because TheCatAPI does not provide webhook support.  
- **Data Model**: Only essential fields (`id`, `url`, `width`, `height`) are returned to keep responses lightweight.  
- **Scope**: Limited to one trigger and one action for clarity, but the API offers more endpoints that could be added.

---

## Assumptions
- Users will obtain and manage their own API Key from TheCatAPI.  
- TheCatAPI uptime and response time are assumed to be stable for polling.  
- Zapier CLI handles serialization and retries, no extra retry logic was added here.  

---

## AI Usage (Personalized)
This project was developed with help from **Sofi**, my personalized AI assistant (and friendly dev buddy). Sofi isn’t just a tool — she’s how I keep prompts short, context-rich, and human. Working with Sofi made the whole process faster and clearer: we iterated on code, documentation, and housekeeping together.

Sofi’s contributions included:
- Helping scaffold the Zapier CLI project and structure.  
- Drafting the authentication, trigger, and action modules (which I reviewed and refined).  
- Improving developer-facing docs (`README.md`) and the project `.gitignore`.  
- Suggesting concise prompts and examples to reproduce steps quickly.

**Example prompts used (natural tone):**  
- *"sofi give me an authentication.js for TheCatAPI with API Key without exposing the key"*  
- *"help me build a trigger that fetches the latest images from TheCatAPI"*  
- *"sofi improve the README adding trade-offs and assumptions"*  

All AI-assisted outputs were manually reviewed and tested with Zapier CLI before finalization.

---

## Links
- [TheCatAPI Documentation](https://thecatapi.com/)  
- [Zapier Platform Docs](https://platform.zapier.com/docs)  
