# ðŸ§  Quiz â€” Day 23
## List Methods and Mutation

---

**Q1.** What does `.append()` return?

A) The modified list
B) The element that was appended
C) `None` â€” it mutates the list in place and returns nothing useful
D) The new length of the list

---

**Q2.** What does this print?
```python
lst = [5, 3, 1, 4, 2]
result = lst.sort()
print(lst)
print(result)
```

A) `[5, 3, 1, 4, 2]` then `[1, 2, 3, 4, 5]`
B) `[1, 2, 3, 4, 5]` then `None`
C) `[1, 2, 3, 4, 5]` then `[1, 2, 3, 4, 5]`
D) `None` then `[1, 2, 3, 4, 5]`

---

**Q3.** What is the difference between `lst.sort()` and `sorted(lst)`?

A) `.sort()` works on any iterable; `sorted()` only works on lists
B) `.sort()` mutates the list in place and returns `None`; `sorted()` returns a new sorted list without changing the original
C) They are identical â€” just different syntax for the same operation
D) `sorted()` sorts in descending order; `.sort()` sorts in ascending order

---

**Q4.** What does this print?
```python
nums = [1, 2, 3, 4, 5]
a = nums.pop()
b = nums.pop(0)
print(nums)
print(a, b)
```

A) `[1, 2, 3, 4, 5]` then `5 1`
B) `[2, 3, 4]` then `5 1`
C) `[2, 3, 4]` then `1 5`
D) `[1, 2, 3, 4]` then `5 1`

---

**Q5.** Which of these list methods BOTH mutates the list AND returns a
useful (non-None) value?

A) `.sort()`
B) `.append()`
C) `.pop()`
D) `.reverse()`

---

**Q6.** A student writes:
```python
words = ["banana", "apple", "cherry"]
words = words.sort()
print(words)
```
What prints?

A) `['apple', 'banana', 'cherry']`
B) `['banana', 'apple', 'cherry']`
C) `None`
D) `TypeError`

---

**Q7.** What does `.remove("banana")` do if `"banana"` appears twice
in a list?

A) Removes both occurrences
B) Removes only the first occurrence
C) Raises a `ValueError`
D) Removes the last occurrence

---

**Q8.** What does this print?
```python
a = [5, 2, 8, 1]
b = sorted(a)
a.reverse()
print(a)
print(b)
```

A) `[1, 2, 5, 8]` then `[1, 2, 5, 8]`
B) `[1, 8, 2, 5]` then `[1, 2, 5, 8]`
C) `[5, 2, 8, 1]` then `[1, 2, 5, 8]`
D) `[8, 5, 2, 1]` then `[5, 2, 8, 1]`

---

**Q9.** How do you get the top 3 highest scores from `scores` as a new
sorted descending list, WITHOUT modifying the original?

A) `scores.sort()[-3:]`
B) `sorted(scores)[-3:][::-1]`
C) `scores[-3:]`
D) `scores.pop() * 3`

---

**Q10.** Which is the correct pattern for the "list accumulator"?

A) `result = None; result.append(x)`
B) `result = []; result = result + x`
C) `result = []; result.append(x); return result`
D) `result = 0; result += [x]`

---

---
