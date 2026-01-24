---
title: "FastAPI Background Tasks and Celery Integration"
description: "When to use FastAPI's built-in background tasks vs Celery for async processing."
pubDate: 2026-01-19
category: "Web"
tags: ["fastapi", "python", "celery", "async", "api"]
---

# FastAPI Background Tasks and Celery Integration

FastAPI has built-in background tasks. Celery exists. When do you use which?

## FastAPI Background Tasks

```python
from fastapi import BackgroundTasks

def send_email(email: str, message: str):
    time.sleep(2)
    print(f"Email sent to {email}")

@app.post("/signup")
async def signup(
    email: str, 
    background_tasks: BackgroundTasks
):
    background_tasks.add_task(send_email, email, "Welcome!")
    return {"status": "User created"}
```

**Good for:** Quick tasks (< 30s), no persistence needed

## Celery for Heavy Lifting

```python
from celery import Celery

celery_app = Celery(
    'tasks',
    broker='redis://localhost:6379/0',
    backend='redis://localhost:6379/1'
)

@celery_app.task
def process_video(video_id: str):
    return f"Processed {video_id}"

@app.post("/upload")
async def upload_video(video_id: str):
    task = process_video.delay(video_id)
    return {"task_id": task.id}
```

**Good for:** Long tasks, retries needed, distributed processing

## Decision Tree

```
Task duration < 30s?
├── Yes → Do you need retries?
│   ├── Yes → Celery
│   └── No → FastAPI BackgroundTasks
└── No → Celery (always)
```
