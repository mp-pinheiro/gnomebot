# README

Recreates all instances in a managed instance group.

# Dependencies

```
pip install -r requirements.txt
```

# Deployment

```bash
gcloud functions deploy recreate-instances \
    --runtime python37 \
    --trigger-http \
    --entry-point process \
    --region us-central1 \
    --memory 256MB \
    --timeout 60s \
    --service-account=$(gcloud iam service-accounts list --filter="name:recreate-instances" --format="value(email)") \
    --env-vars-file=.env.yaml
```

# Environment Variables

```yaml
PROJECT_ID: project-id
ZONE: us-central1-a
INSTANCE_GROUP: instance-group-manager-name
```