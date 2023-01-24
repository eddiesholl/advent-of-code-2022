# Advent of code 2022

https://adventofcode.com/2022

Current progress: 45/50 ⭐️

## Welcome

This is my first year taking part in the [Advent of Code](https://adventofcode.com/) initiative. I've had my eye on it for many years, but December is always such a busy time of the year, I've always felt a bit too swamped. In theory I was going to have a bit more time this Summer, although thanks to COVID and a few other unexpected mishaps, it didn't turn out that way.

To make the most of my time, and to try to keep up with the daily release pattern, I targeted just the first star for each challenge, with a plan to come back through and chase all the second stars for each one.

I've finished my work on this for now. I've been through a second pass, chasing as many second stars as I can, without burning days on each one. There's a couple I'll leave unfinished, from the looks of it.

## Tech stack

As much as I'd love to use this year as a learning / brushing up exersize for an alternate stack, I thought I'd keep things simple for my first time around. It's mostly set up with an ecosystem I know well. I've aimed for the solutions to be 'native' TypeScript as much as possible, so very few packages to help with computation:

- Node version manager: `nvm`
- Node version: `v16`
- Executor: `ts-node`
- Test runner: `jest`
- Linting: `eslint`
- Formatting: `prettier`

You can run a particular day with a command like:

`PUZZLE=19 npm run puzzle`

This is assuming a standard file and folder structure for each day. You can get started on each day pretty quickly with my `template` folder, as each exersize has such similar basic inputs and outputs:

- grab the example and full input
- write the input parser
- define some types
- add some tests
- try it out on the example, then the full input

Tools I'd be close to reaching for:

- Utilities: `ramda`
- Command line visualisation: [log-update](https://www.npmjs.com/package/log-update)

## Thoughts and conclusions

It's a while since I've needed to play with anything but product and business oriented development. I haven't tackled many interview coding challenges in recent years, and any side projects or experimentation have been fairly 'outcome oriented', trying to play with problems matching my typical day. I can't think of the last time I've dropped into a manual `while` loop in JS, for example.

These challenges have a particular flow and style. You might call it 'code golf' or 'fizzbuzz'. Recursion, DFS and BFS, search optimisation and pruning: this is a particular problem space, and for better or worse I don't have much muscle memory for this from recent years. This means my capabilities started limited and ramped up quickly through the challenges. Lots of tips and tools I found later on could be used to improve earlier rounds. I've been able to achieve this where needed, as I go back for a second pass chasing all the second stars.

### Algorithms

So far I've found switching to breadth first searches instead of depth first has been much more reliable and easier to optimise, for problems where that's possible.

### Language / syntax choice

Based on snippets posted on `/r/adventofcode`, the most popular language choice seems to be `python` . The list comprehension capabilities you get out of the box makes it a much better tool for these types of challenges. Splitting head and tail of a list inline is a good example.

The advantage of `TypeScript` is that you can break your solution down into very robust modular functions. The downside is that there is no lighter alternative. Great that the solution ends up more testable, but on balance I'm guessing there's more benefit to be had pulling on the 'less is more' stick, and removing many 'moving parts' in your solution.

If the problems and solutions are outside your typical day, is it a valuable exersize? If you have the time to spend, sure. If you're trying to pick up a new language, it's probably a great way to get your head around clean and minimal syntax choices, but might not be the fastest way to get '9 to 5' productive for that language in your day job.
