# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

gcloud secrets add-iam-policy-binding myApiKeySecret --member="serviceAccount:$(gcloud projects describe studio-9794377776-f2142 --format='value(projectNumber)')-compute@developer.gserviceaccount.com" --role="roles/secretmanager.secretAccessor
