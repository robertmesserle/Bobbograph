# Bobbograph v2.0

Bobbograph is a graphing tool for rendering Canvas-based line-graphs.  This primary focus of this project is to allow as much customization as possible, leaving it up to
the developer to decide what the graph will look like.

## Options

Here is a basic overview of the available options:

Property | Type | Function
---|---|---
**width** | Number | This number will set the width of the generated graph.
**height** | Number | This number will set the height of the generated graph.
**data**   | Object | [Data][Data]

### Data
Property | Type | Description
---|---|---
**vertex** | Boolean | This will eliminate unnecessary points in the graph, resulting in a smoother graph.  By default, this is only enabled with line smoothing is enabled.
**maxPoints** | Number | This is the maximum number of points you want to display.  This can improve performance, and may be necessary with larger data sets.
**normalize** | Number | You can specify how many standard deviations you want to allow.  Points that are too extreme will be removed.

- **padding**
  - **size** *[Number]*
  - **x** *[Number]*
  - **y** *[Number]*
  - **left** *[Number]*
  - **right** *[Number]*
  - **top** *[Number]*
  - **bottom** *[Number]*
- **line**
  - **fill** *[Array/String]*
  - **width** *[Number]*
  - **smooth** *[Boolean]*
- **xAxis**
  - **increment** *[Number]*
- **yAxis**
  - **increment** *[Number]*
