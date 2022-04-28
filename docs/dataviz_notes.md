# Annotated Bibliography - Information Visualization

## Card, Stuart K. 1999. Readings in Information Visualization: Using Vision to Think. San Francisco, Calif: Morgan Kaufmann Publishers. [link](https://archive.org/details/readingsininform00card/page/30/mode/2up).

* Helpful context for the field of data visualization
* Spatial position = most potent, digestible way to represent data. Our brains like spatial.
* "To understand something is called 'seeing' it"
* "Use perception to amplify cognition" -- visualization is a valuable exploratory tool.
* *Why Visualization Matters:* visualization done poorly can obscure patterns that may even be life-or-death... See: the issue of the Challenger O-Rings (explained [here](https://www.asktog.com/books/challengerExerpt.html)) -- though there is debate over whether a better visual would have actually helped.
* Marks = term for the points, lines, areas, and volumes --> basically, the 'things' within your visualization.

## Norman, Donald A. 1993. “Chapter 3: The Power of Representation. Things That Make Us Smart.” Retrieved April 3, 2022. [link](http://vis.csail.mit.edu/classes/6.859/readings/Norman-ThePowerOfRepresentation).

* This reading is full of good quotes so I'll note a few:
  * "The cognitive age of humans started when we used sounds, gestures, and symbols to refer to objects,things, and concepts." -- thus, the author makes the point, visualization is a way to augment cognition.
  * "Solving a problem simply means representing it so as to make the solution transparent."
  * "A good representation captures the essential elements of the event"
* Additive representation: visualization methods where "more of" a representation indicates an increase in value. For example, tally marks, light-to-dark shading, etc. count as this. 
* Substitive representation: different types of a representation indicate different values. For example: hue or shape.
  * Not as easily processable as addititve representation. A common error is using hue to represent an additive value when you could've used light intensity, an easier-to-register metric.

## Bostock, Michael, Vadim Ogievetsky, and Jeffrey Heer. 2011. “D³: Data-Driven Documents.” Ieee Transactions on Visualization and Computer Graphics 17(12). doi: 10.1109/TVCG.2011.185.
* D3 directly maps data attributes to elements in the document object model.
* Design:
  * Based around the idea of selection. Uses the W3C Selectors API (same as JQuery?)
  * `data` is used to bind new data to elements
  * the lifecycle goes through `enter`, `update`, and `exit` states. This facilitates dynamic behavior and the updating of the display as you go.
  * animated transitions using the `transition` operator
  * Layouts facilitate "reusable, flexible visualization techniques by generating abstract data structures" -- i.e. the `force network` layout or the `partition` layout.
  * Like React, they deal with the problem of speed through some sort of dependency-graph to figure out what to update
* They benchmark D3 against Flash Player... throwback!


## A Tour through the Visualization Zoo. Jeffrey Heer, Michael Bostock, and Vadim Ogievetsky. ACM Queue, 8(5). 2010.
* Less theory, and more a description of various graph styles.
* Some worthwhile to explore:
  * SPLOM --> scatter plot matrix, where you put multiple next to each other w/ similiar axes. A good way to display some of my data.
  * Parallel coordinates graphs are another way 

## 39 Studies about Human Perception in 30 Minutes
* "different visual systems promote different reference frames" -- when users see a line chart, they have a bias towards symmetry, and therefore always see the slope as closer to 45 degrees than it really is.
* Bars -> Circles and Squares -> Cubes for comparing size.
* "For each new component in bar charts, a reader needs an additional 1.7 seconds for processing." - Hollands and Spence
* Users notice differences in bar graphs and trends in line graphs.
* When people look at a line graph, they assume that higher means "more" or "better" no matter what.
* For scatterplots, even just zooming out will make people assume there is more of a correlation than exists.
* 3d visualizations, while pretty, can be harder to process.
* Human personalities may affect the typpe of graphs they process easiest
* A half-a-second delay in interactive-graphics is long enough to keep users from using all together.


## Viral Visualizations: How Coronavirus Skeptics Use Orthodox Data Practices to Promote Unorthodox Science Online. Crystal Lee, Tanya Yang, Gabrielle Inchoco, Graham M. Jones, Arvind Satyanarayan. ACM CHI. 2021.
* "Data visualizations are not a neutral window onto an observer-independent reality; during a pandemic, they are an arena of political struggle."
* For COVID skeptics, "to counter-visualize is to engage in an act of resistance against the stifling influence of central government, big business, and liberal academia"
* What to do about this?
  * Recognize that you may not be able to control how people react to visualizations and adjust accordingly.
  * Author recommends highlighitng the uncertainty of data instead of clean expressiviity, since those skeptical of academia don't trust you to begin with.

## Spence R, Tweedie L. The Attribute Explorer: information synthesis via exploration. 1998.
* Data visualization is critical to exploration and revision of issues.
* Dynamic queries are one way to make this happen.
* This is an iconic early article on how data visualization is important not just for 

# Jung et al. Communicating Visualizations without Visuals: Investigation of Visualization Alternative Text for People with Visual Impairments. 2021.
* People with visual impairments generally want to attempt vsualize the actual chart, even if they can't see it. Citing which type of chart it is, and making information like what is on the X-, Y- axis available is helpful.
* Having access to the underlined datapoints was universally desired by study participants, and table formats can be best ingested by screen-readers.
* Table caption should indicate what way the table was sorted to make it more navigable.
* Data sonification is an experimental, rapidly expanding subfield of accessibility whereby users can "hear" data.
* Redundant encoding is helpful -- for example, encoding class by both symbol and color.

# Schwabish, Jonathan, and Alice Feng. 2020. “Applying Racial Equity Awareness in Data Visualization.”
* Make sure you are using the appropriate terminology (i.e. people with disabilities vs. disabled people)
* Data always has an opinion, especially based on what it does not incldue. For example, Census data doesn't have options for non-binary. Recognize the limits of your data, maybe in a caption, to ensure visibility.
* Be conscious about the order in which you show data. If you're comparing by racial groups, for example, you don't need to put White first always.
