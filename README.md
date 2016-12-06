[![Build Status](https://travis-ci.org/jacobtshirt/ts-astar.svg?branch=master)](https://travis-ci.org/jacobtshirt/ts-astar)
# ts-astar

## A* Pathfinding with Typescript

### Supports generics. Use YOUR object types and classes

const shortestPath = astar&lt;T, V&gt;(...)

T - a Position or Node/Location object. Must have a 'x' and 'y' property
V - Represents information about the location can be any object or variable type given some constraints for each type


###Example

#### Using a grid or map
<code>
const shortestPath = astar&lt;Node, string&gt;(new Node(1,2),
                                            new Node(3,4),
                                            new Map&lt;Node, string&gt;().set(new Node(1,2), ' ').set(new Node(1,1), '#').set(new Node(3,4), 'X'));
</code>
#### Using a graph of edges
<code>
const shortestPath = astar&lt;Node, Edge &lt;Node&gt;&gt;(new Node(1,2),
                                            new Node(3,4),
                                            new Array().concat(new Edge(new Node(1,2), new Node(1,2), 0)));
</code>
