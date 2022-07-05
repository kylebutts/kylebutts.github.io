---
title: 'Interactive Factor Model and Imputation Estimators'
author:
  - name: "Kyle Butts"
    url: https://kylebutts.com
    affiliation: CU Boulder
  - name: Nicholas Brown
    url: https://sites.google.com/msu.edu/nicholasbrown
    affiliation: Queen's University
category: 
  - Work in Progress
  - Applied Econometrics
status: 'Work in Progress'
display: true
layout: "../../layouts/PaperLayout.astro"
setup: |
  import { Bg, Color, Figure, LinkBlock, LargeBlock } from "../../components/mdx/"
---

## Abstract

This paper extends the modern imputation-based difference-in-differences estimator to a more general interactive factor model. Unlike previous imputation-based estimators proposed in the literature, our proposed estimator is consistent and asymptotically normal in short-panels. This allows a more-rich model of potential outcomes while still allowing for the common case of short panels. Moreover, we propose a hypothesis test that when rejected suggests that a two-way fixed effect model is insufficient compared to a factor model.

