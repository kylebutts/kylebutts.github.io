---
title: "Multiplying matrices; order maters"
date: "2025-04-19"
author:
  - name: "Kyle Butts"
    url: https://kylebutts.com
description: A quick example of why you should care about matrix dimensions
categories:
  - "Econometrics"
  - "Computer Science"
---

I'm working on speeding up my `did2s` package and came across a perfect example.
Version 1 below is the order I wrote in the current implementation.
I didn't think too carefully and just wrote out the matrix product in the "natural order".

In a typical example `x1` and `x10` are much larger than `x2`, so
`Matrix::solve(Matrix::crossprod(x10), Matrix::t(x10 * first_u))` takes a very long time
(it's like `ncol(x10)` regressions).

I played around and switched the order of multiplications and inversion (`solve`) and saw an over 100x speedup!!

The following three rules help a lot with this:
1. $(A'B)' = B'A$
2. $(A^{-1})' = (A')^{-1}$
3. $(AB)' = B'A'$


Example ran on my M3 macbook pro:

``` r
library(Matrix)
dim(x10)
#> [1] 46500  1530
dim(x1)
#> [1] 46500  1530
dim(x2)
#> [1] 46500    40
``` 

``` r
library(tictoc)
tic("v. 1")
for (i in 1:5) {
  IF_FS_1 <-
    x2tx2_inv %*%
    crossprod(x2, x1) %*%
    solve(crossprod(x10), t(x10 * first_u))
}
toc()
tic("v. 2")
for (i in 1:5) {
  IF_FS_2 <- x2tx2_inv %*%
    t(
      (x10 * first_u) %*%
        solve(crossprod(x10), crossprod(x1, x2))
    )
}
toc()
tic("v. 3")
for (i in 1:5) {
  IF_FS_3 <- tcrossprod(
    x2tx2_inv,
    (x10 * first_u) %*%
      solve(crossprod(x10), crossprod(x1, x2))
  )
}
toc()
tic("v. 4")
for (i in 1:5) {
  IF_FS_4 <-
    x2tx2_inv %*%
    (t(solve(
      crossprod(x10),
      crossprod(x1, x2)
    )) %*%
      t((x10 * first_u)))
}
toc()
tic("v. 5")
for (i in 1:5) {
  IF_FS_5 <-
    (x2tx2_inv %*%
      t(solve(
        crossprod(x10),
        crossprod(x1, x2)
      ))) %*%
    t((x10 * first_u))
}
toc()
expect_equal(IF_FS_1, IF_FS_2)
expect_equal(IF_FS_2, IF_FS_3)
expect_equal(IF_FS_3, IF_FS_4)
expect_equal(IF_FS_4, IF_FS_5)
```

``` 
v. 1: 6.193 sec elapsed
v. 2: 0.19 sec elapsed
v. 3: 0.197 sec elapsed
v. 4: 0.181 sec elapsed
v. 5: 0.051 sec elapsed
```
