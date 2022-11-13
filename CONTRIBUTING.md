# Contributing to SSGulnur

Please use this guide while contributing to the SSGulnur project.

## Welcome

Thank you for your intention to contribute to this project! Every contribution is welcome, important and is very appreciated.

## Issues

You can work on any issue (assuming someone is not already working on it) in this project or can create a new issue if you have an idea that was not already documented. Please leave a comment letting other contributors know that you are starting to explore the issue and will be working on its solution.

## Set-up and contribution

If you are working on one of the issues, you will need to set-up SSGulnur locally.

VSCode is preferred editor, as the recommended extensions will be downloaded automatically.

1. Fork this project, to have your own copy where you would be able to freely make changes.
2. Clone the forked repo to your local machine.
3. Run npm to install the tool globally `npm install -g`.
4. Create a new branch with a descriptive name such as issue-123.
5. Work on that branch and make all required changes to complete the issue.
6. Test you work, run the tool in your terminal.
   - run `npm run lint` and `npm run prettier-check` to check your code for styling issues or bugs.
   - run `npm test` to make sure all the tests are still successful.
7. Commit regularly.
8. When you are done, push your work and request a pull to the `main` branch.

Please give meaningful messages to your commits and pull requests.

## Testing

The [Jest Framework](https://jestjs.io) is used for testing in this project.

You can use the following commands:

- `npm test` for running test
- `npm test example-test` for running only the tests that were specified with a pattern or filename (e.g. `npm test createHTML`)
- `npm run test:watch` for running tests related to changed files based on git (uncommitted files)
- `npm run coverage` for checking the coverage of the tests
