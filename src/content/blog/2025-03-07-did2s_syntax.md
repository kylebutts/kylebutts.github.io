---
title: "A note on did2s syntax"
date: "2025-03-07"
author:
  - name: "Kyle Butts"
    url: https://kylebutts.com
description: I get a lot of questions about `first_stage` vs. `second_stage` in `did2s`. This note hopefully will help clarify it
categories:
  - "Econometrics"
---

Being the author of the `did2s` package, I get a lot of emails from folks asking how to properly specify a `first_stage` and `second_stage` argument. 
A typical usage will look like:

``` r
library(did2s)
did2s(
	data = df,
	yname = "y",
	first_stage = ~ 0 | unit + year,
	second_stage = ~ i(post * treated),
	treatment = "treat",
	cluster_var = "state"
)
```

It is equivalent to the following:

``` r 
library(fixest)
fs <- feols(
  y ~ 0 | unit + year,
  data = subset(df, treat == 0)
)
df$y_diff <- df$y - predict(fs, newdata = df)
ss <- feols(
  y_diff ~ i(post * treated),
  data = df
)
```

Note the first-stage is run only using observations where the `treatment` variable takes the value 0. 
These should be the untreated and not-yet-treated observations ($d_{it} = 0$).
The `first_stage` argument is therefore your model for *untreated* potential outcomes, $Y_{it}(0)$.
So, this could include things like state-specific linear trends, time-invariant covariates interacted with time-dummies, etc. 
But, it should *not* include any treatment variables (these are untreated $Y$).

Next, you use your estimated model (predicting $Y_{it}(0)$) to forecast for the *entire* sample including post-treatment observations with $d_{it} = 1$. 

The `second_stage` is what you regress $Y_{it} - \hat{Y}_{it}(0)$ on. 
If you observed this $Y_{it}(0)$, this variable would take the value 0 for all $d_{it} = 0$ observations and would take the value $\tau_{it}$ for all $d_{it} = 1$ observations.
Therefore, the `second_stage` is your model for how you want to summarize (estimated) unit-time treatment effects. 
This could be things like a treat x post variable, event-study indicators, or an interaction between a treat x post and some discrete variable (like gender). 
Of course, when you take these averages you want there to be a large number of observations (so a central limit theorem can kick in). 

In summary:
1. `first_stage` tells you the model for $Y_{it}(0)$ you estimate with the `treatment` = 0 group.
2. `second_stage` tells you how you want to summarize estimated treatment effects
