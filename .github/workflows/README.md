# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automating various tasks in the repository.

## Feed Management Workflow (`feed.yml`)

The feed management workflow automates the creation, updating, and deletion of feed entries based on GitHub issues.

### Features

- **Automated Feed Entry Creation**: Creates markdown files from GitHub issues labeled with `feed`
- **Content Validation**: Ensures issue body is not empty and meets minimum length requirements
- **Robust Date Handling**: Handles different date formats and timezones for filename generation
- **Error Handling**: Provides clear error messages and validation feedback
- **Security**: Only allows repository owner to create feed entries
- **Automatic Cleanup**: Closes issues after processing and triggers site rebuilds

### How It Works

1. **Trigger**: Workflow runs when issues are opened, edited, labeled, or unlabeled
2. **Validation**: Checks if the user is the repository owner and if the issue has the `feed` label
3. **Processing**: Uses the composite action `feed-utils` to handle file operations
4. **File Management**: Creates, updates, or deletes markdown files in `content/feed/`
5. **Feedback**: Comments on issues with results and closes them when appropriate

### Usage

To create a feed entry:

1. Create a new issue in the repository
2. Add the `feed` label to the issue
3. Write your content in the issue body (minimum 10 characters)
4. The workflow will automatically:
   - Create a markdown file with timestamp-based filename
   - Commit the changes to the repository
   - Comment on the issue with a link to the created file
   - Close the issue
   - Trigger a site rebuild

To update a feed entry:

1. Edit an existing issue with the `feed` label
2. The workflow will update the corresponding markdown file

To delete a feed entry:

1. Remove the `feed` label from an issue
2. The workflow will delete the corresponding markdown file

### File Naming Convention

Feed files are named using the format: `YYYYMMDDHHMM.md` based on the issue creation timestamp.

### Security

- Only the repository owner can create feed entries
- Unauthorized attempts are automatically closed with an explanation
- Content is validated to prevent empty or invalid entries

### Error Handling

The workflow includes comprehensive error handling:

- **Validation Errors**: Clear messages for invalid content
- **File Not Found**: Graceful handling when trying to delete non-existent files
- **Date Parsing**: Fallback mechanisms for different date formats
- **Git Operations**: Checks for actual changes before committing

### Composite Actions

The workflow uses a composite action (`feed-utils`) located in `.github/actions/feed-utils/` to:

- Validate issue content
- Generate filenames from timestamps
- Handle file operations (create, update, delete)

This modular approach makes the workflow more maintainable and testable.

### Environment Variables

- `FEED_LABEL`: The label used to identify feed issues (default: `feed`)
- `FEED_DIR`: Directory for storing feed files (default: `content/feed`)
- `GITHUB_BOT_NAME`: Name for Git commits (default: `github-actions[bot]`)
- `GITHUB_BOT_EMAIL`: Email for Git commits

### Timeouts and Concurrency

- Main job timeout: 10 minutes
- Unauthorized issue handling timeout: 5 minutes
- Uses `fetch-depth: 0` for full repository history

### Dependencies

- `actions/checkout@v4`: Repository checkout
- `gh` CLI: GitHub CLI for issue management and API calls
- Custom composite action: `./.github/actions/feed-utils` 