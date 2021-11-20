library(htmltools)

create_row <- function(name, stata_code, r_code, subitem = FALSE, top = FALSE, bottom = FALSE) {
  code_class <- glue::glue("lg:col-span-3 bg-white border-2 rounded-lg shadow-lg select-all flex flex-col justify-center")

  h2_class <- ifelse(subitem, "lg:ml-4 italic", "font-semibold")

  h2_class <- glue::glue("lg:col-span-2 lg:py-4 self-center text-gray-600 text-lg {h2_class}")

  div(
    class = "grid grid-row lg:grid-col lg:grid-cols-8 gap-y-4 lg:gap-y-0 lg:gap-x-8 py-4 items-stretch",
    h2(class = h2_class, name),
    pre(
      class = code_class,
      code(class = "language-text", stata_code)
    ),
    pre(
      class = code_class,
      code(class = "language-r", r_code)
    )
  )
}

create_section <- function(...) {
  div(class = "px-4 divide-y", ...)
}

create_section_header <- function(name) {
  div(
    class = "grid grid-cols-8 gap-x-8 py-4 items-stretch my-4",
    h2(class = "col-span-8 lg:col-span-2 font-bold text-2xl text-emerald-700", name),
    div(class = "lg:col-span-3"),
    div(class = "lg:col-span-3")
  )
}

# Formula Creation
div(class="max-w-[84rem] w-[95%] mt-12",
  create_section(
    create_section_header("Formula Creation")
  ),
  create_section(
    create_row(
      "Fixed Effects",
      "reghdfe y x, absorb(fe)",
      "feols(y ~ x | fe, data)"
    ),
    create_row(
      "Categorical Variables",
      "reghdfe y x i.cat",
      "feols(y ~ x + i(cat), data)"
    ),
    create_row("With Baseline",
      "reghdfe y x ib1.cat",
      "feols(y ~ x + i(cat, ref = 1), data)",
      subitem = T
    ),
    create_row("Interact Categoricals",
      "reghdfe y x i.cat#i.cat2",
      "feols(y ~ x + i(cat, i.cat2), data)",
      subitem = T
    ),
    create_row("Categorical and Continuous",
      "reghdfe y x c.cont#i.cat",
      "feols(y ~ x + i(cat, cont), data)",
      subitem = T
    ),
    create_row(
      "Macros",
      "local vars varlist \n reghdfe y x `vars'",
      "vars = c(...) \n feols(y ~ x + .[vars], data)"
    ),
    create_row("Wildcard",
      "reghdfe y x age_*",
      "feols(y ~ x + ..('age_'), data)",
      subitem = T
    ),
    create_row("Variables v1 ... v4",
      "reghdfe y x v1-v4",
      "feols(y ~ x + v.[1:4], data)",
      subitem = T
    ),
    create_row("Regex",
      "",
      "feols(y ~ x + ..('regex_exp'), data)",
      subitem = T
    ),
  )
) |>
  as.character() |>
  clipr::write_clip()

# Standard Errors
div(class="max-w-[84rem] w-[95%] mt-12",
  create_section(
    create_section_header("Standard Errors")
  ),
  create_section(
    create_row(
      "Robust",
      "reghdfe y x, r",
      "feols(y ~ x, data, 'hetero')"
    ),
    create_row(
      "Cluster",
      "reghdfe y x, cluster(clust)",
      "feols(y ~ x, data, vcov = ~clust)"
    ),
    create_row("Two-way",
      "reghdfe y x, cluster(clust1 clust2)",
      "feols(y ~ x, data, vcov = ~clust1 + clust2)",
      subitem = T
    ),
	create_row("Conley Standard Errors",
		"",
      	"feols(y ~ x, data, vcov = conley('lat', 'lon', 50))"
    ),
  )
) |>
  as.character() |>
  clipr::write_clip()

# Postestimation
div(class="max-w-[84rem] w-[95%] mt-12",
	create_section(
		create_section_header("Post-Estimation")
	),
  	create_section(
	 	create_row(
		  "Regression Table",
		  "reghdfe ... \n eststore est1 \n estout ...",
		  "est1 <- feols(...) \n etable(est1)"
		),
		create_row(
			"Coefficient Plot",
			"reghdfe ... \n eststore est1 \n estout ...",
		  	"est1 <- feols(...) \n coefplot(est1)"
		)
  	)
) |>
  as.character() |>
  clipr::write_clip()

# Panel Data
div(class="max-w-[84rem] w-[95%] mt-12",
  create_section(
    create_section_header("Panel Data")
  ),
  create_section(
    create_row(
      "Lag Variables",
      "xtset unit time \n reg y x l1.x l2.x",
      "panel(df, ~unit + time) \n feols(y ~ x + l(x, 1:2), df)"
    ),
    create_row(
      "Lead Variables",
      "xtset unit time \n reg y x f1.x f2.x",
      "panel(df, ~unit + time) \n feols(y ~ x + l(x, -2:-1), df)"
    ),
    create_row(
      "First Difference",
      "xtset unit time \n reg y x D.x",
      "panel(df, ~unit + time) \n feols(y ~ x + d(x), df)"
    ),
  )
) |>
  as.character() |>
  clipr::write_clip()


# IV
div(class="max-w-[84rem] w-[95%] mt-12",
  create_section(
    create_section_header("Instrumental Variables")
  ),
  create_section(
    create_row(
      "Instrumental Variables",
      "ivreghdfe 2sls y x (x1 = z1)",
      "feols(y ~ x | x1 ~ z1, df)"
    ),
    create_row("with Fixed Effects",
      "ivreghdfe 2sls y x (x1 = z1), absorb(fe1)",
      "feols(y ~ x | fe1 | x1 ~ z1, df)",
      subitem = T
    )
  )
) |>
  as.character() |>
  clipr::write_clip()
