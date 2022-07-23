---
title: "All about influence functions"
date: "2021-08-05"
author:
  - name: "Kyle Butts"
    url: https://kylebutts.com
    affiliation: CU Boulder
    affiliation_url:
description: Introductory notes with detailed derivations of influence functions. I took these notes while trying to learn the material myself.
category: 
  - "Econometrics"
display: true
layout: "../../layouts/ProseLayout.astro"
setup: |
  import { Bg, Color, Figure, LinkBlock, LargeBlock } from "../../components/mdx/"
---

# Influence functions

Note that this material is mainly a summary of the math in [Ben](https://j-kahn.com/files/influencefunctions.pdf) [Jann's](https://boris.unibe.ch/130362/1/jann-2019-influencefunctions.pdf) [notes](http://repec.sowi.unibe.ch/files/wp35/jann-2020-IF.pdf) compiled together with additional writing by myself.

## Setup

Let ${\bf z}_n = \{z_i\}_{i=1}^n$ be a random sample of data that comes from some true underlying distribution $F$. We take this data and compute some estimator with it: $\hat{\theta}({\bf z}_n)$ (scalar or vector). Note that this is a function of the sample we observe, ${\bf z}_n$. Some examples:

1. **Sample Mean:** $z_i$ is a scalar and $\hat{\theta}({\bf z}_n)$ the sample mean of the data.

$$
\mu = \mathbb{E}_F\left[ z_i \right]
$$

2. **Regression:** $\{z_i \equiv (x_i, y_i)\}_{i=1}^n$ be a random sample of data, where $x_i$ is a $1\times k$ vector of covariates and $y_i$ is a scalar outcome. $\hat{\theta}({\bf z}_n)$ would be the OLS coefficients $\beta$.

$$
  \beta = argmin_{\beta} \mathbb{E}_F\left[ (y-X\beta)'(y-X\beta) \right]
$$

3. **Treatment Effect:** $\{z_i \equiv (y_i, D_i)\}_{i=1}^n$ where $y_i$ is the outcome and $D_i$ is the treatment indicator. $\hat{\theta}({\bf z}_n)$ would be the treatment effect on the treated. The estimate would be the sample analogue of

$$
\tau = \mathbb{E}_F\left[ y_i \vert D_i = 1\right] - \mathbb{E}_F\left[ y_i \vert D_i = 0\right]
$$

## The influence function

First, we define a **contaminated distribution function**, $F_\epsilon(z_i)$, as:

$$
F_\epsilon(z_i) = (1-\epsilon)F + \epsilon\delta_{z_i}
$$

where $\delta_{z_i}$ is the probability measure which assigns probability 1 to $z_i = (x_i, y_i)$ and 0 to all other elements. In effect, $F_\epsilon(z_i)$ makes data point $z_i = (x_i, y_i)$ slightly more likely _in the population_. To make clear, if $\epsilon = 0.5$ that means with (at least) probability 1/2 you observe $z_i$ given a random draw from $F_\epsilon(z_i)$.

Our goal is to see what happens to our estimator when we increase the probability of seeing $z_i$ in the _population_. This gives us a sense of how $z_i$ _influences_ the sample distribution of the estimator $\hat{\theta}({\bf z}_n)$.

To build intuition, let's think about outliers in regressions. If one observation, $z_i$, is a high-leverage outlier, then intuitively its presence has a lot of influence on the regression coefficients. Formally, the influence function asks if you make this $z_i$ slightly more likely, how much does it move the estimated coefficients, $\hat{\beta}$.

To formalize this, we will use what's called a "Gateaux derivative" which is just the fancy version of a derivative. The **influence function** of $\hat{\theta}$ at $F$, $IF_{\hat{\theta}, F}(z_i)$ is defined as:

$$
  IF_{\hat{\theta}, F}(z_i) = \lim_{\epsilon \to 0} \frac{\theta(F_\epsilon(x)) - \theta(F)}{\epsilon}
$$

This is a slight change of notation as we are now not specifying a particular sample ${\bf z}_n$, but instead the distribution it is drawn from. The influence function is worked out based on the actual population moments that give rise to the sample estimates. This will hopefully make more sense when we work out some examples below.

## Influence function and Variance of Estimator

What's helpful about knowing the influence function is that we can think of our sample estimator as being equal to the true value (so long as we have unbiasedness) plus $n$ disturbances of the distribution with weight $\epsilon = \frac{1}{n}$ for each. Each disturbance causes the true estimate to be influenced (or moved) by approximately $\frac{1}{n} * IF_{\hat{\theta}, F}(z_i)$ (derivative times a change in x). Since we are extrapolating the derivative by a distance of $\frac{1}{n}$, this gives rise to higher order terms from the Taylor expansion:

$$
\hat{\theta}({\bf z_n}) = \underbrace{\theta_0}_{\text{unbiasedness}} + \sum_{i=1}^n \underbrace{\frac{1}{n} * IF_{\hat{\theta}, F}(z_i)}_{\text{approx. influence of } z_i} + \text{higher order terms}
$$

An important thing to know is that $\mathbb{E}_F \left[ IF_{\hat{\theta}, F}(z_i) \right] = 0$. Therefore, the second term above is going to be approximately zero in large samples, so we have that the mean of $\hat{\theta}({\bf z_n}) - \theta_0$ is zero (Note this doesn't prove unbiasedness because we are assuming that already.)

This is similar to OLS asymptotics: $$ \sqrt{n} \hat\beta - \beta*0 = \frac{1}{\sqrt{n}} \sum*{i=1}^n (X'X)^{-1}X'\varepsilon + \sqrt{n} \* \text{higher order terms} $$. Just like in the OLS case, having our Taylor Expansion is helpful because then asymptotics comes easy:

$$
\implies \sqrt{n}\left( \hat{\theta}({\bf z_n}) - \theta_0 \right) = \frac{1}{\sqrt{n}} \sum_{i=1}^n IF_{\hat{\theta}, F}(z_i) + \sqrt{n} * \text{higher order terms}
$$

Under some assumptions, the higher order terms go to zero faster than $\sqrt{n}$ goes to infinity, so the product is approximately zero under large samples.

Therefore, from some central limit theorem:

$$
\sqrt{n}\left( \hat{\theta}({\bf z_n}) - \theta_0 \right) \to^d N(0, \mathbb{E}_F \left[ \sum_{i=1}^n IF_{\hat{\theta}, F}(z_i)' IF_{\hat{\theta}, F}(z_i)  \right])
$$

So, if you know the influence function, then you have large scale asymptotics for free! Then you can just plug in the sample estimates of $IF_{\hat{\theta}, F}(z_i)$ for each $z_i$ and you have the variance-covariance matrix for your estimator.

### Example 1: Mean

$z_i$ is a scalar and our estimator is the population mean of the data, $\hat{\theta}(F) = \mathbb{E}_F\left[ z_i \right]$.

Our estimator is the sample analogue of: $$\hat\theta(F) = E_F(z_i)$$

Lets think about what happens when we use the contaminated distribution function:

$$
\begin{align*}
  \hat{\theta}(F_{\epsilon}(z_i)) &= \mathbb{E}_{F_{\epsilon}(z_i)}\left[ z_i \right] \\
  &= (1 - \epsilon) \mathbb{E}_F\left[ z_i \right] + \epsilon E_{\delta_{z_i}} \left[ z_i \right] \\
  &= (1 - \epsilon) \hat{\theta}(F) + \epsilon z_i \\
\end{align*}
$$

Note that the last equality comes from the fact that we are taking the expectation over the degenerate distribution $\delta_{z_i}$ which has mean $z_i$.

Now lets plug that back into the influence function equation

$$
\begin{align*}
  IF_{\hat{\theta}, F}(z_i) &= \lim_{\epsilon \to 0} \frac{\hat{\theta}(F_\epsilon(x)) - \hat{\theta}(F)}{\epsilon} \\
  &= \frac{(1 - \epsilon) \hat{\theta}(F) + \epsilon z_i - \hat{\theta}(F)}{\epsilon} \\
  &= \frac{-\epsilon \hat{\theta}(F) + \epsilon z_i}{\epsilon} \\
  &= z_i - \mathbb{E}_F\left[ z_i \right]
\end{align*}
$$

This makes intuitive sense. Observations $z_i$ are more influential to the sample estimator if they are further away from the population mean.

We can estimate $\mathbb{E}_F\left[ z_i \right]$ with the sample mean, and

$$
\widehat{IF}_{\hat{\theta}, F}(z_i) = z_i - \bar{z}
$$

Let $\theta_0$ be the true population mean, $\mathbb{E}_F\left[ z_i \right]$. From above and our calculate influence function, we know that

$$
\sqrt{n}(\bar{z} - \theta_0) \sim N(0, \frac{1}{n}\mathbb{E}_F[ IF_{\hat{\theta}, F}'IF_{\hat{\theta}, F}]) = N(0, \mathbb{E}_F\left[ (z_i-\bar{z})^2\right]),
$$

which we can estimate this variance with $\frac{1}{n} \sum_{i=1}^n (z_i - \bar{z})^2$, the sample variance.

### Example 2: Regression coefficients

$\{z_i \equiv (x_i, y_i)\}_{i=1}^n$ where $x_i$ is a $1\times k$ vector of covariates and $y_i$ is a scalar outcome. The estimator is

$$
  \hat{\beta}(F) = argmin_{\beta} \mathbb{E}_F\left[ (y-X\beta)'(y-X\beta) \right]
$$

Lets think about what happens when we use the contaminated distribution function:

$$
\hat{\beta}(F_{\epsilon}(z_i)) =  argmin_{\beta} \left( (1-\epsilon) \mathbb{E}_F[(y-X\beta)'(y-X\beta)]  + \epsilon (y_i-x_i\beta)'(y_i-x_i\beta) \right)
$$

The first term is the average squared error under the distribution F times $(1-\epsilon)$ and the second term is the average squared error at the point $z_i$ times $\epsilon$.

Expanding terms:

$$
\begin{align*}
  \hat{\theta}(F_{\epsilon}(z_i)) &= argmin_{\beta} \left\{ (1-\epsilon) \mathbb{E}_F[y'y - 2 y'X\beta - \beta'X'X\beta] \right. \\
  &\quad\quad + \left. \epsilon * (y_i'y_i - 2 y_i'x_i\beta - \beta'x_i'x_i\beta)\right\}
\end{align*}
$$

Which gives first order condition:

$$
(1-\epsilon) \mathbb{E}_F[ -2X'y - 2X'X \hat{\beta}_{\epsilon}] + \epsilon(2x_i'y_i - 2 x_i'x_i \hat{\beta}_{\epsilon}) = 0
$$

$$
\implies (1-\epsilon) \mathbb{E}_F[ -X'y - X'X \hat{\beta}_{\epsilon}] = - \epsilon(x_i'y_i - x_i'x_i \hat{\beta}_{\epsilon})
$$

Now we are going to use a common trick. Which is to take the derivative with respect to $\epsilon$ of the first order condition. This will give us a bunch of terms but also $\frac{\partial \hat{\beta_{\epsilon}}}{\partial \epsilon}$ which is the influence function! So we can solve the total derivative of the first order condition using $\epsilon \to 0$ to get the influence function.

Taking the total derivative of the first order condition with respect to $\epsilon$:

$$
\begin{align*}
&\overbrace{- \mathbb{E}_F[ - X'y - X'X \hat{\beta}_{\epsilon}] + (1-\epsilon) \underbrace{\mathbb{E}_F\left[ \frac{\partial X'X \hat{\beta}_{\epsilon} }{\partial \hat{\beta}_{\epsilon}} \right] \frac{\partial \hat{\beta}_{\epsilon}}{\partial \epsilon}}_{\text{chain rule}}}^{\text{product rule}} \\
&\quad=-(x_i'y_i - x_i'x_i \hat{\beta}_{\epsilon}) - \epsilon \frac{\partial x_i' x_i \hat{\beta}_\epsilon}{\partial \hat{\beta}_{\epsilon}} * \frac{\partial \hat{\beta}_{\epsilon}}{\partial \epsilon}
\end{align*}
$$

To simplify a bunch, note that **as $\epsilon \to 0$**:

(i) The first term, $\mathbb{E}_F[ - X'y - X'X \hat{\beta}_{\epsilon}] \to 0$ from first order condition.

(ii) The last term, $\epsilon \frac{\partial x_i' x_i \hat{\beta}_\epsilon}{\partial \hat{\beta}_{\epsilon}} * \frac{\partial \hat{\beta}_{\epsilon}}{\partial \epsilon} \to 0$ because $\epsilon \to 0$.

(iii) $\frac{\partial X'X \hat{\beta}_{\epsilon} }{\partial \hat{\beta}_{\epsilon}} = X'X$

Therefore, as $\epsilon \to 0$:

$$
\begin{align*}
&- \underbrace{\mathbb{E}_F[ - X'y - X'X \hat{\beta}_{\epsilon}]}_{= 0} + \underbrace{(1-\epsilon)}_{\to 1} \underbrace{ = \mathbb{E}_F\left[ \frac{\partial X'X \hat{\beta}_{\epsilon} }{\partial \hat{\beta}_{\epsilon}} \right]}_{\mathbb{E}_F\left[ X'X \right]} \frac{\partial \hat{\beta}_{\epsilon}}{\partial \epsilon} \\
&\quad=-(x_i'y_i - x_i'x_i \hat{\beta}_{\epsilon}) - \underbrace{\epsilon \frac{\partial x_i' x_i \hat{\beta}_\epsilon}{\partial \hat{\beta}_{\epsilon}} * \frac{\partial \hat{\beta}_{\epsilon}}{\partial \epsilon}}_{\to 0}
\end{align*}
$$

$$
\implies \mathbb{E}_F[ X'X ] \frac{\partial \hat{\beta}_{\epsilon}}{\partial \epsilon} = - (x_i'y_i - x_i'x_i \hat{\beta}_{\epsilon})
$$

Since $\frac{\partial \hat{\beta}_{\epsilon}}{\partial \epsilon}$ is the definition of the influence function and $\hat{\beta}_{\epsilon} \to \beta$ as $\epsilon \to 0$:

$$
IF_{\hat{\beta}({\bf z}_n),F}(z_i) = - \mathbb{E}_F[X'X]^{-1} x_i' (y_i - x_i \beta)
$$

### Example 3: Treatment Effect

For the last example, we are looking at the average treatment effect among the treated which assumes that counterfactual untreated outcomes are uncorrelated with treatment, i.e. $y_i(0) \perp D_i$. Our data is $z_i = (y_i, D_i)$ which is iid. Out estimator is the sample analogue of:

$$\hat{\tau}(F) = E_F\left[ y_i \vert D_i = 1\right] - E_F\left[ y_i \vert D_i = 0\right]$$

Note that this is a sum of two estimators from the data: $\tau_1(F) = E_F(y_i \vert D_i = 1)$ and $\tau_0(F) = E_F(y_i \vert D_i = 0)$.

Since influence functions can be expressed as derivatives, we get to use the usual chain rule.

**Chain Rule:** If $\hat{\theta} = T(\hat{\theta}_1, \dots, \hat{\theta}_k)$, then the influence function of $\hat{\theta}$ is:

$$
IF_{\hat{\theta}, F}(Z_i) = \frac{\partial T}{\partial \hat\theta_1} IF_{\hat{\theta}_1, F}(Z_i) + \dots + \frac{\partial T}{\partial \hat\theta_k} IF_{\hat{\theta}_k, F}(Z_i)
$$

In the context of our function $\hat{\theta}(F) = \tau_1(F) - \tau_0(F)$, the influence function is

$$
IF_{\hat{\theta}, F}(Z_i) = 1 * IF_{\hat{\theta}_1, F}(Z_i) - 1 * IF_{\hat{\theta}_0, F}(Z_i)
$$

### Influence function of conditional mean

Let's compute the influence function for $\hat{\tau}_1(F) = E_F\left[Y_i \vert D_i = 1\right]$. For observation $i$, if $D_i = 0$, then $\hat{\theta}(F_{\epsilon}(z_i)) = \hat{\theta}(F)$ and hence the influence function is $0$.

If $D_i = 1$, then

$$
\begin{align*}
  \hat{\theta}(F_{\epsilon}(z_i)) &= \mathbb{E}_{F_{\epsilon}(z_i)}\left[ y_i \vert D_i = 1 \right] \\
  &= (1 - \epsilon) \mathbb{E}_F\left[ y_i \vert D_i = 1 \right] + \epsilon y_i \\
  &= (1 - \epsilon) \hat{\theta}(F) + \epsilon y_i\\
\end{align*}
$$

Again, plugging into the influence function derivative formula:

$$
\lim_{\epsilon \to 0} \frac{(1 - \epsilon) \hat{\theta}(F) + \epsilon y_i - \hat{\theta}(F)}{\epsilon} = y_i - \hat{\theta}(F)
$$

Therefore,

$$
IF_{\hat{\theta}_1, F} = \mathcal{1}(D_i = 1) * (y_i - \mathbb{E}\left[y_i \vert D_i = 1\right])
$$

Similarly, for $\hat{\theta}_0(F)$,

$$
IF_{\hat{\theta}_0, F} = \mathcal{1}(D_i = 0) * (y_i - \mathbb{E}\left[y_i \vert D_i = 0\right])
$$

### Influence function of ATT

From the above two derivations, we have:

$$
\begin{align*}
IF_{\hat{\theta}, F}(Z_i) &= 1 * IF_{\hat{\theta}_1, F}(Z_i) - 1 * IF_{\hat{\theta}_0, F}(Z_i) \\
&= \mathcal{1}(D_i = 1) * (y_i - \mathbb{E}\left[y_i \vert D_i = 1\right])\\
&\quad\quad - \mathcal{1}(D_i = 0) * (y_i - \mathbb{E}\left[y_i \vert D_i = 0\right])
\end{align*}
$$

## Appendix: Matrix Algebra rules

For help working through the OLS section:

1. For $k\times 1$ vectors $a$ and $b$:

$$
  \frac{\partial a'b}{\partial b} = \frac{\partial b'a}{\partial b} = a
$$

2. For $k\times 1$ vectors $b$ and _symmetric_ $k \times k$ matrix $A$:

$$
  \frac{\partial b'Ab}{\partial b} = 2Ab = 2 b'A
$$

3. $m \times 1$ vector $y$, $n \times 1$ vector $x$, and $m \times n$ matrix $A$:

$$
  \frac{\partial y'Ax}{\partial x} = y'A
$$

$$
  \frac{\partial y'Ax}{\partial y} = x'A'
$$
