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
