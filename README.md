# Readme.MD

After cloning the repository, run `npm install --all` to gather dependencies, then run `npm start` to view the site. Alternatively, view the live link below.

## Deliverables
* [FIGMA](https://www.figma.com/file/mOs9M5uwKTn4DVN6vus3Aa/BLM-Data-Viz?node-id=0%3A1)
* [Written plan](https://docs.google.com/document/d/1f0vWbrOFOvzdMtdBkgcXzHu2FV0qED3jIjInsNmHhHs/edit?usp=sharing)
* [Live website](https://soft-kringle-222c04.netlify.app/)
* [Github Repository](https://github.com/ray-hc/blm_data_viz)
* [Annotated bibliography](https://github.com/ray-hc/blm_data_viz/blob/main/docs/dataviz_notes.md)


## Design
* This website was built with the React framework.
* All D3 elements are contained in a React component within the `D3-views` folder, which calls functions in the `D3-render` folder to actually do the rendering.
* To avoid any Frankenstein combination of D3-React, once a component is passed down to D3, all child components farther down in tree are handled in D3. There is no "communication" back to React.
* Within this website, the following types of visualization are included:
  * Chord
  * Line chart (and multi-line chart)
  * Chloropleth geographic visualization (with sonic component)
  * Dynamic network visualization (Force Atlas)
* In addition, because screen-readers can navigate tables better than most visualizations, an option to render as table is included with all line charts.

## Highlights
* The "simulation playground". 
  * The simulations implemented made some simplifications on those I did for my thesis, but the network builder ended up being a lot of fun and I think with some tuning and better UI, will come out well.
* Because my network was too large to visualize, I used a chord diagram to illustrate connections between USA geographic clusters. This was technically complicated but has the most seamless interactivity of any visualization
* Designing the sonic visualizations for the world map came out well -- finding the found sounds of BLM marches was a good way to sync up the sounds with what the chart is trying to convey
* At the twilight of the term, I feel I am becoming a D3 convert -- I cannot imagine any other way to have made the network visualization than with D3.

## Challenges (Lowlights?)
* I've slowly realized that D3 is mostly one man's passion project and this can help explain some of its idiosyncrasies, lack of documentation, etc…. Most of my time was spent trying to figure out how code samples online working
* Narrative cohesiveness is lacking in this version and I'm guessinng decent chunks are not super comprehendible to the outside observer. 
  * Knowing how much detail to add without adding too many paragraphs was hard and I ran out of time to think this through.
* I missed several goals outlined in the beginning of this project. These include:
  * Extending accessibility to all components. 
    * Several are lacking on this front as I prioritized getting basic versions of all visualizations done first.
  * Missing visualizations
    * Several visualizations on my website are images of python's matplotlib output, because I ran out of time to generate in D3. My linear charts turned out to be less portable than I imagined.
  * Visualizing uncertainty. 
    * One of my goals had been to demonstrate to users how, for example, tweaking the assumptions made in the simulations about how much people check Twitter, etc. would affect research results.

## Next Steps
* This project still needs to be fleshed out and polished before it is ready to be shared widely. This version ended up more of a "rough draft" than I'd like it to have been.
* Over the next month, I plan to address the challenges / missing components as detailed above, for eventual wider sharing later this summer.
