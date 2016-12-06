[![Build Status](https://travis-ci.org/jacobtshirt/ts-astar.svg?branch=master)](https://travis-ci.org/jacobtshirt/ts-astar)
# ts-astar

## A* Pathpathing with Typescript

### Supports generics. Use YOUR object types and classes

const shortestPath = astar<T, V>(...)

T - a Position or Node/Location object. Must have a 'x' and 'y' property
V - Represents information about the location can be any object or variable type given some constraints for each type


###Example
<code>
// Using a grid or map
const shortestPath = astar<Node, string>(new Node(1,2),
                                            new Node(3,4),
                                            new Map<Node, string>().set(new Node(1,2), ' ').set(new Node(1,1), '#').set(new Node(3,4), 'X'));
// Using a graph of edges
const shortestPath = astar<Node, Edge<Node>>(new Node(1,2),
                                            new Node(3,4),
                                            new Array().concat(new Edge(new Node(1,2), new Node(1,2), 0)));
</code>