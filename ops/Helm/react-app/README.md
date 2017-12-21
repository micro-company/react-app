# Front-End

### Run

```
helm --kube-context minikube install \
  --name react-app     \
  --namespace=micro-company \
  --set CI_PROJECT_NAME="react-app" \
  .
```

### Stop

```
helm del --purge react-app
```
