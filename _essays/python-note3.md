---
layout: essay_single
title: Python debug note
date: 2023-10-10
tags:
   - python language
categories:
- Notes
feature_text: |
  ## Python Random note
  Post by ailswan Oct.10 , 2023
feature_image: "https://picsum.photos/2560/600?image=865"
---

### Tricky Python note for debug

**# backtracking must use the deep copy**:
 ```python
  res.append(path[:])
  ```
**# rotated array must use module**:
 ```python
  k %= n  
  ```
**# create defaultdict**:
  ```python
  dic = defaultdict(list)
  for word in wordList
    for i in range(len(word)):
      dic [word[:i] + "_" word[i + 1:]]. append(word)
  ```
 
 **pending:**
 implement multiple threads