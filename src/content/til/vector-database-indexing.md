---
title: "Vector Database Indexing: HNSW vs IVF"
description: "Comparing approximate nearest neighbor algorithms for production vector search systems."
pubDate: 2026-01-21
category: "AI/ML"
tags: ["vectors", "database", "hnsw", "faiss", "search"]
---

# Vector Database Indexing: HNSW vs IVF

Not all vector indexes are created equal. Here's my comparison after running both in production.

## HNSW (Hierarchical Navigable Small World)

```python
import hnswlib

index = hnswlib.Index(space='cosine', dim=1536)
index.init_index(max_elements=1000000, ef_construction=200, M=16)

index.add_items(vectors, ids)

labels, distances = index.knn_query(query_vector, k=10)
```

**Pros:** Fast queries, no training needed  
**Cons:** High memory usage, slow inserts

## IVF (Inverted File Index)

```python
import faiss

quantizer = faiss.IndexFlatL2(1536)
index = faiss.IndexIVFFlat(quantizer, 1536, nlist=1000)
index.train(training_vectors)

index.add(vectors)

index.nprobe = 10
distances, labels = index.search(query_vector, k=10)
```

**Pros:** Lower memory, fast bulk inserts  
**Cons:** Requires training, slightly lower recall

## Benchmark Results (1M vectors, 1536 dims)

| Metric | HNSW | IVF |
|--------|------|-----|
| Query Latency | 2ms | 5ms |
| Memory | 6GB | 2GB |
| Insert Time | 45min | 8min |
| Recall@10 | 98% | 94% |

My recommendation: HNSW for < 10M vectors, IVF-PQ for larger scales.
