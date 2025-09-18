# CodersLink / Zapier Integration Challenge

## Overview
This project is a sample Zapier integration built for the CodersLink Skill Test.  
It connects with **TheCatAPI** as the target service.

- **Authentication**: API Key (sent in header `x-api-key`)  
- **Trigger**: `New Image` – retrieves the latest images from TheCatAPI  
- **Action**: `Create Favorite` – marks an image as favorite  

This setup demonstrates the ability to handle authentication, polling triggers, and POST actions in a Zapier CLI integration.

---

## Requirements
- Node.js 18 or higher  
- [Zapier Platform CLI](https://github.com/zapier/zapier-platform) (`npm i -g zapier-platform-cli`)  
- Free API Key from [TheCatAPI](https://thecatapi.com/)  

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
5. Test both steps. A successful action returns `{ "message": "SUCCESS", "id": ... }`.  

---

## Trade-offs and Assumptions
- **Polling vs Webhooks**: The integration uses polling since TheCatAPI provides simple GET endpoints but no webhook support.  
- **Sample Data**: The trigger returns a limited set of fields (`id`, `url`, `width`, `height`) to keep it simple.  
- **API Choice**: TheCatAPI was chosen as a lightweight public API suitable for demonstration.  

---

## AI Usage
Artificial Intelligence (ChatGPT) was used during the development process to:
- Scaffold the base Zapier CLI project.  
- Generate authentication, trigger, and action modules.  
- Draft and refine this README.  

The code was manually reviewed and tested with Zapier CLI commands before finalization.

---

## Links
- [TheCatAPI Documentation](https://thecatapi.com/)  
- [Zapier Platform Docs](https://platform.zapier.com/docs)  
