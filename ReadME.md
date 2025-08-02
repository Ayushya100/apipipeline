# ⚙️ Microservices Platform – Monorepo

## 🧩 Introduction
This repository contains a fully containerized microservices architecture for a real-world application that includes:
- User management (`accounts-svc`)
- Email dispatching (`email-svc`)
- Notification system (`notification-svc`)
- Problem handling (`problems-svc`)
- API operations executor (`api-handler-wrk`)
- External code execution engine (`judge0`)
- API gateway (`api-gateway`)
- Frontend application (React)
- Shared dependencies (`Redis`, `RabbitMQ`)

---

## 📦 Services Overview

| Service           | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| `accounts-svc`     | Handles user registration, login, and authentication. Uses Redis & RabbitMQ. |
| `email-svc`        | Listens to message queues and sends emails. Uses Redis & RabbitMQ.         |
| `notification-svc` | Sends system notifications. No Redis usage.                                |
| `problems-svc`     | Manages problems/tasks to be executed by `api-handler-wrk`. Uses Redis & RabbitMQ. |
| `api-handler-wrk`  | Worker service that performs tasks pushed by `problems-svc`. Uses Redis & RabbitMQ. |
| `judge0`           | External engine for code execution. Used by workers.                       |
| `api-gateway`      | Routes and manages all internal APIs. No Redis usage.                      |
| `frontend`         | React-based UI that interacts via `api-gateway`.                           |

---

## 🐳 Run All Services (Docker Compose)

To run all services together:

```bash
docker-compose up --build
Docker Commands:
- docker-compose -f docker-compose.dev.yml up --build
This will build images for all your services using their Dockerfile, start all containers and stream logs to terminal.

- docker-compose -f docker-compose.dev.yml up --build -d
Add -d to run in detached mode

- docker-compose -f docker-compose.dev.yml up --build accounts-svc
Rebuild specific services only.

- docker-compose -f docker-compose.dev.yml down
Stop execution
```